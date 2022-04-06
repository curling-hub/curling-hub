import { OkPacket, RowDataPacket } from 'mysql2'
import * as yup from 'yup'

import addMatchSchema from '../../components/profile/addMatch/schema'
import { pool } from '../db'

type AddMatchSchema = yup.InferType<typeof addMatchSchema>

export async function create(form: AddMatchSchema) {
    let winner = 'tie'
    if (form.matchResult.toUpperCase() === 'WIN') {
        winner = 'team_id_1'
    } else if (form.matchResult.toUpperCase() === 'LOSS') {
        winner = 'team_id_2'
    }
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
            conn.query(queryInsertMatchTeamRel, [ form.opponent, matchId ]),
            conn.query(queryInsertMatchTeamRel, [ form.currentTeam, matchId ]),
        ])
        await conn.commit()
    } catch (error: any) {
        await conn.rollback()
    } finally {
        conn.release()
    }
}
