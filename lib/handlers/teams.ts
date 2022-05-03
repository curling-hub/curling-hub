import { RowDataPacket } from 'mysql2'
import { Op } from 'sequelize'
import { UserInstance } from 'next-auth'
import { Includeable, WhereOptions } from 'sequelize/types'
import { sequelize } from '../db'
import moment from 'moment'

import * as DbModels from '../db_model'

import type { Category, TeamInfo } from '../models'
import { MatchResult } from '../models/match'
import { TeamCreationForm, TeamMember } from '../models/team'
import { TeamRanking, TeamWithMembersAndRatings } from '../models/teams'

export async function teams() {
    return 0
}

export async function getTeamInfo(teamId: number): Promise<TeamInfo & TeamWithMembersAndRatings | null> {
    const result = await DbModels.TeamInfoModel.findOne({
        where: { teamId },
        include: [
            {
                model: DbModels.TeamGlickoInfoModel,
                as: 'teamGlickoInfo',
            },
            {
                model: DbModels.TeamMemberModel,
                as: 'members',
            },
        ],
    })
    return result?.toJSON<TeamInfo & TeamWithMembersAndRatings>() || null
}

export async function populateTeamMatchesPage(teamId: string) {
    const matchInfo = await DbModels.MatchModel.findAll({
        where: {
            [Op.or]: [{teamId1: teamId}, {teamId2: teamId}]
        }
    })
    const teamNames = await DbModels.TeamInfoModel.findAll()
    const hostNames = await DbModels.HostInfoModel.findAll()

    var names = new Map()
    teamNames.map((team) => {
        let t = team.get()
        names.set(t.teamId, t.name)
    })
    var hosts = new Map()
    hostNames.map((host) => {
        let h = host.get()
        hosts.set(h.hostId, h.organization)
    })
    const matches = matchInfo.map((match) => match.get())
    
    return matches.map((match) => ({
        date: (1+match.date.getMonth()).toString()+
            '/'+
            match.date.getDate().toString()+
            '/'+
            match.date.getFullYear().toString()
            ,
        outcome: match.teamId1.toString() == teamId && match.winner == 'team_id_1' ? 'Win' : 
                 match.teamId1.toString() == teamId && match.winner == 'team_id_2' ? 'Loss' : 
                 match.teamId2.toString() == teamId && match.winner == 'team_id_2' ? 'Win' :
                 match.teamId2.toString() == teamId && match.winner == 'team_id_1' ? 'Loss' :
                 'Tie',
        opponent: match.teamId1.toString() == teamId ? names.get(match.teamId2) : names.get(match.teamId2),
        location: hosts.get(match.hostId),
        sheetOfIce: match.sheetOfIce,
        comment: match.comments
    }))
}

export async function getTeamMatches(teamId: number) {
    const winnerMap = (m: any) => {
        if (m.winner === 'team_id_1') {
            return m.teams.filter((t: TeamInfo) => t.teamId === m.teamId1)[0].name
        } else if (m.winner === 'team_id_2') {
            return m.teams.filter((t: TeamInfo) => t.teamId === m.teamId2)[0].name
        }
        return null
    }
    const team = await DbModels.TeamInfoModel.findOne({
        where: { teamId },
        include: [{
            model: DbModels.MatchModel,
            as: 'matches',
            include: [{
                model: DbModels.TeamInfoModel,
                as: 'teams',
            }],
        }],
        attributes: [],
        order: [['matches', 'date', 'DESC']],   // ORDER BY matches.date DESC
    })
    const matches = team?.matches
        .map((m) => ({
            matchId: m.matchId,
            team_1_name: m.teams.filter((t) => t.teamId === m.teamId1)[0].name,
            team_2_name: m.teams.filter((t) => t.teamId === m.teamId2)[0].name,
            winner: winnerMap(m),
            date: moment(m.date).format('YYYY-MM-DD'),
        }))
    return matches || []
}

export async function getTeamContactInfo(teamId: number): Promise<Array<{teamName: string, teamEmail: string}>> {
    // TODO: SQL query and data format
    const team = await DbModels.TeamInfoModel.findOne({
        where: { teamId },
        include: [{
            model: DbModels.UserModel,
            as: 'admins',
        }],
    })
    if (!team) {
        return []
    }
    return team.admins.map((u) => ({
        teamName: team.name,
        teamEmail: u.email || '',
    }))
}

export async function getTeamMembers(teamId: number): Promise<TeamMember[]> {
    const members = await DbModels.TeamMemberModel.findAll({
        where: { teamId },
    })
    return members.map((m) => m.toJSON())
}

export async function getTeamCategories(teamId: number): Promise<Category[]> {
    const categories = await DbModels.CategoryModel.findAll({
        include: [{
            model: DbModels.TeamInfoModel,
            where: { teamId },
            required: true,
            as: 'Teams',
            attributes: [],
        }],
    })
    return categories.map((c) => c.toJSON())
}

export async function getAllTeams(): Promise<TeamInfo[]> {
    return await DbModels.TeamInfoModel.findAll({
        raw: true,
    })
}

export async function getTeamById(teamId: number): Promise<TeamInfo | null> {
    return await DbModels.TeamInfoModel.findOne({
        where: {
            teamId: teamId,
        },
        raw: true,
    })
}


interface RankingOptions {
    categoryId?: number
}

export async function getAllRankings(options?: RankingOptions): Promise<Array<TeamInfo & TeamWithMembersAndRatings>> {
    const includeOptions = []
    let includeCategory: Includeable | undefined = undefined
    if (options && options.categoryId) {
        includeCategory = {
            model: DbModels.CategoryModel,
            required: true,
            attributes: [],
            where: {
                categoryId: options.categoryId,
            },
        }
    }
    if (includeCategory) {
        includeOptions.push(includeCategory)
    }
    const teams = await DbModels.TeamInfoModel.findAll({
        include: [
            ...includeOptions,
            {
                model: DbModels.TeamMemberModel,
                as: 'members',
            },
            {
                model: DbModels.TeamGlickoInfoModel,
                as: 'teamGlickoInfo',
                required: true,
            },
            {
                model: DbModels.RatingPeriodModel,
                as: 'ratingPeriods',
                order: ['endDate', 'ASC'],
            },
        ],
        order: [ ['teamGlickoInfo', 'rating', 'DESC'] ],
    })
    return teams.map((t) => t.toJSON())
}

function toTeamRanking(teamInfoList: TeamWithMembersAndRatings[]): TeamRanking[] {
    return teamInfoList.map((t) => ({
        ID: t.teamId,
        Team: t.name,
        Rating: t.teamGlickoInfo.rating,
        Changes: t.ratingPeriods.map((rt) => rt.RatingHistory.rating),
        Players: t.members.map((m) => m.name),
    }))
}

export async function getAllRankingsSimple(): Promise<TeamRanking[]> {
    const rankings = await getAllRankings()
    return toTeamRanking(rankings)
}

export async function getRankingsByCategorySimple(categoryId: number): Promise<TeamRanking[]> {
    const rankings = await getAllRankings({ categoryId })
    return toTeamRanking(rankings)
}

export async function createTeam(form: TeamCreationForm): Promise<any> {
    const result = await sequelize.transaction(async (t) => {
        // 1. Update the account type to `curler`
        await DbModels.UserModel.update({
            account_type: 'curler',
        }, {
            where: { email: form.email },
            transaction: t,
        })

        // 2. Create team
        const team = await DbModels.TeamInfoModel.create({
            name: form.name,
            rating: '700',  // TODO: choose a default rating
        }, {
            transaction: t,
        })

        // 2. Add categories to team
        await Promise.all(form.categories.map((categoryId) =>
            team.addCategory(categoryId, { transaction: t })
        ))

        // 3. Add team members to team
        await Promise.all(form.curlers.map((curlerInfo) =>
            DbModels.TeamMemberModel.create({
                teamId: team.teamId,
                name: curlerInfo.name,
            }, { transaction: t })
        ))

        return team.get()
    })
    return result
}