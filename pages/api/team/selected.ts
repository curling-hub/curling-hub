import type { NextApiRequest, NextApiResponse } from 'next'
import { RowDataPacket } from 'mysql2'
import { pool } from '../../../lib/db'
import type { TeamInfo } from '../../../lib/models'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<TeamInfo[]>
) {
    const query = `
    SELECT p.team_id as ID, p.name as Team, g.rating as Rating, group_concat(t.name) as Players
    FROM team_profile p INNER JOIN team_members t ON p.team_id = t.team_id INNER join
    team_glicko_info g ON g.team_id = t.team_id
    WHERE 
    GROUP BY t.team_id 
    ORDER BY g.rating DESC;
    `

    const [rows, _] = await pool.promise().query(query)
    const r = rows as RowDataPacket[]
}