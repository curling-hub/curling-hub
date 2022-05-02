import { RowDataPacket } from 'mysql2'
import { Op } from 'sequelize'
import { Includeable, WhereOptions } from 'sequelize/types'
import { pool, sequelize } from '../db'

import * as DbModels from '../db_model'

import type { TeamInfo } from '../models'
import { TeamCreationForm } from '../models/team'
import { TeamRanking, TeamWithMembersAndRatings } from '../models/teams'

export async function teams() {
    return 0
}

export async function getTeamInfo(team_Id: string) {
    const query = `
        SELECT DISTINCT
            tp.team_id,
            tp.name,
            tp.rating
        FROM team_profile tp
        WHERE tp.team_id = ?`
        const queryArgs = [team_Id]
    const [rows, _] = await pool.promise().query(query,queryArgs)
    const r = rows as RowDataPacket[]
    /* console.log(r) */
    return r.map((val) => ({
        teamId: val['team_id'],
        name: val['name'],
        rating: val['rating']
    }))
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

export async function getTeamMatches(teamId: string) {
    const query = `
        SELECT 
            mi.match_id,
            team_1.name as team_id_1,
            team_2.name as team_id_2,
            winner,
            cat.name as category,
            mi.date
        FROM match_info mi
        JOIN team_profile team_1 
        ON mi.team_id_1 = team_1.team_id
        JOIN team_profile team_2
        ON mi.team_id_2 = team_2.team_id
        JOIN categories cat
        ON mi.category_id = cat.category_id
        JOIN match_team_rel match_rel
        ON mi.match_id = match_rel.match_id
        WHERE match_rel.team_id = ?`
        + `
        ORDER BY mi.date desc`
    const queryArgs = [teamId]
    const [rows, _] = await pool.promise().query(query,queryArgs)
    const r = rows as RowDataPacket[] 
    
    return r.map((val) => ({
        matchId: val['match_id'],
        team_1_name: val['team_id_1'],
        team_2_name: val['team_id_2'],
        winner: val[val['winner']] || null, // winner is literally 'team_id_1'
        category: val['category'],
        date: `${val['date']}`,
    }))
}

export async function getTeamContactInfo(teamId: string) {
    // TODO: SQL query and data format
    const query = `
        SELECT 
            tp.name,
            usr.email as email
        FROM  team_profile tp
        JOIN users usr
        ON usr.id = tp.team_id
        WHERE tp.team_id = ?`
    const queryArgs = [teamId]
    const [rows, _] = await pool.promise().query(query,queryArgs)
    const r = rows as RowDataPacket[]
    return r.map((val) => ({
        teamName: val['name'],
        teamEmail: val['email'],
    }))
}

export async function getTeamMembers(teamId: string) {
    const query = `
        SELECT DISTINCT
            tm.name as member_name
        FROM team_members tm
        WHERE tm.team_id = ?`
    const queryArgs = [teamId]
    const [rows, _] = await pool.promise().query(query,queryArgs)
    const r = rows as RowDataPacket[]
    return r.map((val) => ({
        memberName: val['member_name'],
    }))
}

export async function getTeamCategories(teamId: string) {
    const query = `
        SELECT DISTINCT
            cat.name as category_name
        FROM team_members tm
        JOIN categories_rel cat_rel
        ON tm.team_id = cat_rel.team_id
        JOIN categories cat
        ON cat_rel.category_id = cat.category_id
        WHERE tm.team_id = ?`
    const queryArgs = [teamId]
    const [rows, _] = await pool.promise().query(query,queryArgs)
    const r = rows as RowDataPacket[]
    return r.map((val) => ({
        categoryName: val['category_name'],
    }))
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