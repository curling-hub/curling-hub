import * as yup from 'yup'

import addMatchSchema from '../../components/profile/addMatch/schema'
import { sequelize } from '../db'
import * as DbModels from '../db_model'
import { MatchResult } from '../models/match'

type AddMatchSchema = yup.InferType<typeof addMatchSchema>

export async function create(form: AddMatchSchema): Promise<MatchResult> {
    let winner = 'tie'
    if (form.matchResult.toUpperCase() === 'WIN') {
        winner = 'team_id_1'
    } else if (form.matchResult.toUpperCase() === 'LOSS') {
        winner = 'team_id_2'
    }
    const result = await sequelize.transaction(async (t) => {
        // 1. Create match result
        const matchResult = await DbModels.MatchModel.create({
            hostId: form.location,
            teamId1: form.team1,
            teamId2: form.team2,
            winner: winner,
            sheetOfIce: form.sheetOfIce || null,
            comments: form.comments || null,
            date: form.date,
        })
        // TODO: Add checks for teamId1 and teamId2 - what if some team plays against themselves?
        // 2. Create relation between match and team
        await matchResult.addTeam([matchResult.teamId1, matchResult.teamId2])
        return matchResult.toJSON()
    })
    return result
}

export async function getHostMatchesById(hostId: string): Promise<MatchResult[]> {
    const hostMatchesList = await DbModels.MatchModel.findAll({
        where: {
            hostId: hostId,
        },
        order: [['date', 'ASC']],
        /* include: [{
            model: DbModels.TeamInfoModel,
            as: 'teamName1',
            where: { teamId: 'teamId1' },
            required: true,
            include: [{
                model: DbModels.TeamInfoModel,
                as: 'teamName2',
                where: { teamId: 'teamId2' },
                required: true
            }],
        }], */
        nest: true,
    })

    if (!hostMatchesList) {
        return []
    }
    return hostMatchesList.map((matchResults) => matchResults.get())
}
