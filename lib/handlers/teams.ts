import { OkPacket, RowDataPacket } from 'mysql2'
import { pool } from '../db'

import type { TeamInfo } from '../models'


export async function teams() {
    return 0
}

export async function getAllTeams(): Promise<TeamInfo[]> {
    const query = `
        SELECT
            team_id,
            name,
            rating
        FROM team_profile
    `
    const [rows, _] = await pool.promise().query(query)
    const r = rows as RowDataPacket[]
    return r.map((val) => ({
        teamId: val['team_id'],
        name: val['name'],
        rating: val['rating'],
    }))
}

export async function getTeamById(teamId: number): Promise<TeamInfo | null> {
    const query = `
        SELECT
            team_id,
            name,
            rating
        FROM team_profile
        WHERE team_id = ?;
    `
    const [rows, _] = await pool.promise().query(query, [teamId])
    const r = rows as RowDataPacket[]
    if (r.length === 0) {
        return null
    }
    const val = r[0]
    return Object.assign({}, {
        teamId: val['team_id'],
        name: val['name'],
        rating: val['rating'],
    })
}
