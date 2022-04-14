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
<<<<<<< HEAD
    const result = await sequelize.transaction(async (t) => {
        // 1. Create match result
        const matchResult = await DbModels.MatchModel.create({
            hostId: form.location,
            teamId1: form.currentTeam,
            teamId2: form.opponent,
            winner: winner,
            sheetOfIce: form.sheetOfIce || null,
            comments: form.comments || null,
            date: form.date,
        })
        // TODO: Add checks for teamId1 and teamId2 - what if some team plays against themselves?
        // 2. Create relation between match and team
        await matchResult.addTeam([matchResult.teamId1, matchResult.teamId2])
        return matchResult.get()
    })
    return result
=======
    const queryInsertMatch = `
        INSERT INTO match_info (
            host_id,
            team_id_1,
            team_id_2,
            winner,
            sheet_of_ice,
            comments,
            category_id,
            date
        ) VALUES (
            ?, ?, ?, ?, ?, ?, ?, NOW()
        );
    `
    const queryInsertMatchArgs = [
        form.location,
        form.currentTeam,
        form.opponent,
        winner,
        form.sheetOfIce,
        form.comments,
        form.category,
        form.date,
    ]
    const queryInsertMatchTeamRel = `
        INSERT INTO match_team_rel (
            team_id, match_id
        ) VALUES (
            ?, ?
        ) ON DUPLICATE KEY UPDATE
            team_id=team_id,
            match_id=match_id;
    `
    const conn = await pool.promise().getConnection()
    try {
        await conn.beginTransaction()
        // 1. Insert match
        const [results, _] = await conn.query(queryInsertMatch, queryInsertMatchArgs)
        const r = results as OkPacket
        const matchId = r.insertId
        // 2. Insert match team rel
        await Promise.all([
            conn.query(queryInsertMatchTeamRel, [form.opponent, matchId]),
            conn.query(queryInsertMatchTeamRel, [form.currentTeam, matchId]),
        ])
        await conn.commit()
    } catch (error: any) {
        await conn.rollback()
    } finally {
        conn.release()
    }
>>>>>>> initial db query
}

