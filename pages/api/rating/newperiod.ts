// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
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


type MethodHandler = {
    [key: string]: Function
}

const postHandler: NextApiHandler = async (req, res) => {
    try {
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
        if (!glickoVariable) {
            res.status(500).json({ error: 'No glicko variable'})
            return
        }
        const ratings = computeRatings(matches, teamRatings, glickoVariable)
        // 5. Update rating history
        await createRatingAndPeriod({startDate, endDate}, ratings)

        res.status(200).json({ data: ratings })
    } catch (error: any) {
        console.log(error)
        if (/^ValidationError/.test(error.toString())) {
            res.status(400).json({ error: 'Bad parameters' })
        } else {
            res.status(500).json({ error: 'Internal server error'})
        }
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const method = req.method || ''
    const methodHandler: MethodHandler = {
        'POST': postHandler,
    }
    if (typeof methodHandler[method] === 'undefined') {
        res.status(405).json({ error: 'Method not allowed' })
        return
    }
    await methodHandler[method](req, res)
}
