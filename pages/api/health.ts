import { NextApiRequest, NextApiResponse } from 'next'
import { QueryTypes } from 'sequelize'

import { sequelize } from '../../lib/db'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const results = await sequelize.query<{status: number}>(
            'SELECT 1 AS status',
            { type: QueryTypes.SELECT },
        )
        const dbStatus: number = results[0].status
        res.status(200).json({ status: dbStatus })
    } catch (error) {
        res.status(500).json({ status: 0 })
    }
}