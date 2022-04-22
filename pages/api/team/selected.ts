import { RowDataPacket } from 'mysql2'
import type { NextApiRequest, NextApiResponse } from 'next'
import { pool } from '../../../lib/db'
import { TeamRanking } from '../../../lib/models/teams'

type Data = {
    data?: TeamRanking[],
    error?: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.body && req.body.id == 0) {
        
         const query = `
            SELECT p.team_id as ID, p.name as Team, g.rating as Rating, x.Changes, group_concat(t.name) as Players
            FROM team_profile p INNER JOIN team_members t ON p.team_id = t.team_id INNER join
            team_glicko_info g ON g.team_id = t.team_id left outer join 
            (
                select rh.team_id, group_concat(rh.rating) as Changes
                from rating_history rh INNER JOIN rating_periods rp on rp.rating_period_id = rh.rating_period_id
                group by rh.team_id
                order by rp.end_date
            ) as x on x.team_id = p.team_id
            GROUP BY t.team_id 
            ORDER BY g.rating DESC;
            `
            
            try {
                const [rows, _] = await pool.promise().query(query)
                const r = rows as RowDataPacket[]
                const data = r.map((val) => ({
                    ID: val['ID'],
                    Team: val['Team'],
                    Rating: val['Rating'],
                    Changes: val['Changes'] ? 
                    val['Changes'].split(',').map((num: string) => parseInt(num)) : [], 
                    Players: val['Players']
                }))
                res.status(200).json({data: data, error: undefined})
            } catch(e: any) {
                return res.status(500).json({data: undefined, error: e.code})
            }
    } else if (req.body && req.body.id != 0) {
        const query = `
            SELECT p.team_id as ID, p.name as Team, g.rating as Rating, x.Changes, group_concat(t.name) as Players
            FROM team_profile p INNER JOIN team_members t ON p.team_id = t.team_id INNER join
            team_glicko_info g ON g.team_id = t.team_id left outer join 
            (
                select rh.team_id, group_concat(rh.rating) as Changes
                from rating_history rh INNER JOIN rating_periods rp on rp.rating_period_id = rh.rating_period_id
                group by rh.team_id
                order by rp.end_date
            ) as x on x.team_id = p.team_id
            INNER JOIN categories_rel cr ON t.team_id = cr.team_id
            WHERE cr.category_id = ?
            GROUP BY t.team_id 
            ORDER BY g.rating DESC;
            `

            try {
                const [rows, _] = await pool.promise().query(query, req.body.id)
                const r = rows as RowDataPacket[]
                const data = r.map((val) => ({
                    ID: val['ID'],
                    Team: val['Team'],
                    Rating: val['Rating'],
                    Changes: val['Changes'] ? 
                    val['Changes'].split(',').map((num: string) => parseInt(num)) : [], 
                    Players: val['Players']
                }))
                res.status(200).json({data: data, error: undefined})
            } catch(e: any) {
                console.log(e)
                return res.status(500).json({data: undefined, error: e.code})
            }
    }
}