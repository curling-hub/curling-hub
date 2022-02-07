import { NextApiRequest, NextApiResponse } from 'next'

import { health } from '../../lib/db'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const dbStatus = await health()
        res.status(200).json({ status: dbStatus })
    } catch (error) {
        res.status(500).json({ status: 0 })
    }
}