import type { NextApiRequest, NextApiResponse } from 'next'
import { getMatchesBetween } from '../../../lib/handlers/rating'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const matches = await getMatchesBetween(new Date('2022-04-01'), new Date())
    console.log(matches)
    res.status(200).json({ data: matches })
}
