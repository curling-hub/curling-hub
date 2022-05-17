import { Op } from 'sequelize'
import { Includeable, WhereOptions } from 'sequelize/types'
import { sequelize } from '../db'
import moment from 'moment'

import * as DbModels from '../db_model'

import type { Category, TeamInfo } from '../models'
import type { TeamCreationForm, TeamMember } from '../models/team'
import type { TeamMatch, TeamRanking, TeamWithMembersAndRatings } from '../models/teams'
import { AccountType } from '../models/accountType'
import { getCurrentSettings } from './rating'

export async function teams() {
    return 0
}

export async function isUserOnTeam(teamId: number, userId: string): Promise<boolean> {
    const result = await DbModels.TeamAdminModel.findAll({
        where: { 
            teamId: teamId,
            userId: userId
        }
    })

    return !result
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

export async function getTeamMatches(teamId: number): Promise<TeamMatch[]> {
    const team = await DbModels.TeamInfoModel.findOne({
        where: { teamId },
        include: [{
            model: DbModels.MatchModel,
            as: 'matches',
            include: [
                {
                    model: DbModels.TeamInfoModel,
                    as: 'teams',
                },
                {
                    model: DbModels.HostInfoModel,
                    as: 'host',
                    required: true,
                    attributes: {
                        exclude: ['updatedAt'],
                    },
                },
            ],
        }],
        attributes: [],
        order: [['matches', 'date', 'DESC']],   // ORDER BY matches.date DESC
    })
    const matches: TeamMatch[] = team?.matches
        .map((m) => ({
            ...m.toJSON(),
            date: (moment(m.date).format('YYYY-MM-DD') as unknown) as Date,
        })) || []
    return matches
}

export async function getTeamContactInfo(teamId: number): Promise<Array<{ teamName: string, teamEmail: string }>> {
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
            as: 'Categories',
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
        order: [['teamGlickoInfo', 'rating', 'DESC']],
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

export async function getTeamEmailById(teamId: number): Promise<string | null> {
    return (await DbModels.UserModel.findOne({
        attributes: ["email"],
        include: [{
            model: DbModels.TeamInfoModel,
            as: 'teams',
            where: { teamId: teamId }
        }]
    }))?.email || null
}

export async function createTeam(form: TeamCreationForm): Promise<any> {
    const result = await sequelize.transaction(async (t) => {
        // 1. Update account type
        const user = await DbModels.UserModel.findOne({
            where: { email: form.email },
            transaction: t,
        })
        if (!user) {
            throw new Error('User not found')
        }
        await user.update({
            account_type: AccountType.TEAM,
        }, { transaction: t })

        // 2. Create team
        const current_glicko = await getCurrentSettings();
        const team = await DbModels.TeamInfoModel.create({
            name: form.name,
            rating: current_glicko?.defaultRating.toString(),
        }, {
            transaction: t,
        })

        // 3. Add team admin
        await DbModels.TeamAdminModel.create({
            teamId: team.teamId,
            userId: user.id,
        }, { transaction: t })

        // 4. Add categories to team
        await Promise.all(form.categories.map((categoryId) =>
            team.addCategory(categoryId, { transaction: t })
        ))

        // 5. Add team members to team
        await Promise.all(form.curlers.map((curlerInfo) =>
            DbModels.TeamMemberModel.create({
                teamId: team.teamId,
                name: curlerInfo.name,
            }, { transaction: t })
        ))

        return team.toJSON()
    })
    return result
}