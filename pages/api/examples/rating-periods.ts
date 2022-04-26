import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllRatingPeriods } from '../../../lib/handlers/rating'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const ratingPeriods = await getAllRatingPeriods()
    console.log(ratingPeriods)
    res.status(200).json({ data: ratingPeriods })
}
