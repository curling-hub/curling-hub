import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllTeamRatings, getCurrentRatingPeriod, getCurrentSettings, getMatchesBetween, updateRatingForRatingPeriod } from '../../../lib/handlers/rating'
import { computeRatings } from '../../../lib/glicko/glicko'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    // 1. Get info
    const [ teamRatings, glickoVariable, ratingPeriod ] = await Promise.all([
        getAllTeamRatings(),
        getCurrentSettings(),
        getCurrentRatingPeriod(),
    ])
    const matches = await getMatchesBetween(new Date('2022-04-01'), new Date())
    // 2. Compute ratings (not async because no I/O)
    const ratings = computeRatings(matches, teamRatings, glickoVariable)
    // 3. Update rating history
    await updateRatingForRatingPeriod(ratingPeriod?.ratingPeriodId || 0, ratings)
    res.status(200).json({ data: ratings })
}
