// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import moment from 'moment'
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { getAllTeamRatings, getCurrentSettings, getEarliestMatch, getLatestRatingPeriod } from '../../../lib/handlers/rating'

type MethodHandler = {
    [key: string]: Function
}

const postHandler: NextApiHandler = async (req, res) => {
    try {
        const [ ratingPeriod, earliestMatch ] = await Promise.all([
            getLatestRatingPeriod(),
            getEarliestMatch(),
        ])
        
        // Compute new rating period dates
        const yesterday = moment({hour: 23, minute: 59, second: 59}).subtract(1, 'days')
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

        // TODO: return message `Ok` and the created object
        return res.status(200).json({ data: startDate })
    } catch (error: any) {
        return res.status(500).json({ error: 'Internal server error'})
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