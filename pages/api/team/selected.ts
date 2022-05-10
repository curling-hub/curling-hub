import type { NextApiRequest, NextApiResponse } from 'next'
import { TeamRanking } from '../../../lib/models/teams'
import { getAllRankingsSimple, getRankingsByCategorySimple } from '../../../lib/handlers/teams'

type Data = {
    data?: TeamRanking[],
    error?: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    // Get by categories id
    if (req.body && req.body.id !== 0) {
        try {
            const data = await getRankingsByCategorySimple(req.body.id)
            res.status(200).json({data: data, error: undefined})
        } catch (e: any) {
            console.log(e)
            res.status(500).json({data: undefined, error: e.code})
        }
        return
    }
    // Get all
    try {
        const data = await getAllRankingsSimple()
        res.status(200).json({data: data, error: undefined})
    } catch (e: any) {
        res.status(500).json({data: undefined, error: e.code})
    }
}
