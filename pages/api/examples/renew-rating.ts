import type { NextApiRequest, NextApiResponse } from 'next'
import moment from 'moment'
import { computeRatings } from '../../../lib/glicko/glicko'
import {
    getAllTeamRatings,
    getLatestRatingPeriod,
    getCurrentSettings,
    getMatchesBetween,
    getEarliestMatch,
    createRatingAndPeriod,
} from '../../../lib/handlers/rating'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    // 1. Get info
    const [ teamRatings, glickoVariable, ratingPeriod, earliestMatch ] = await Promise.all([
        getAllTeamRatings(),
        getCurrentSettings(),
        getLatestRatingPeriod(),
        getEarliestMatch(),
    ])
    // TODO: extract into its own function
    // 2. Compute new rating period dates
    const yesterday = moment({hour: 23, minute: 59, second: 59}).subtract(1, 'days')
    const endDate = yesterday.toDate()
    let startDate = ratingPeriod?.endDate
    if (!startDate) {
        // if no rating period, default start date to earliest match date
        startDate = earliestMatch?.date
    }
    if (!startDate) {
        // default to beginning of quarter
        const quarter = yesterday.quarter()
        const year = yesterday.year()
        startDate = moment(`${year}-${quarter}`, 'YYYY-Q').toDate()
    }
    const matches = await getMatchesBetween(startDate, endDate)
    // TODO: extract into its own function
    // 3. Validate start date and end date
    const oneDay = 60 * 60 * 24
    const periodDuration = moment(endDate).diff(moment(startDate))
    if (periodDuration <= oneDay) {
        // Error short period
        res.status(400).json({ error: 'Rating period is too short' })
        return
    }
    // 4. Compute ratings (not async because no I/O)
    const ratings = computeRatings(matches, teamRatings, glickoVariable)
    // 5. Update rating history
    //await createRatingAndPeriod({startDate, endDate}, teamRatings)
    res.status(200).json({ data: ratings })
}
