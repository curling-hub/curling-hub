import { RowDataPacket } from 'mysql2'
import { pool } from '../db'


export async function teams() {
    return 0
}

export async function getAllTeams() {
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
