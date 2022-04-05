// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import pool from '../../../lib/db'

type Data = {
    error: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (
        req 
        && req.body 
        && req.body.team 
        && req.body.curler1 
        && req.body.curler2
        && req.body.curler3
        && req.body.curler4
        && req.body.alternate
        && req.body.categories
    ) {
        const query1 = `INSERT INTO team_profile(${req.body.team}, 750)`
    } else if (
        req 
        && req.body
        && req.body.team 
        && req.body.curler1 
        && req.body.curler2
        && req.body.curler3
        && req.body.curler4
        && req.body.categories
    ) {
        res.status(200).json({ error: ""})
    } else if (
        req 
        && req.body
        && req.body.team 
        && req.body.curler1 
        && req.body.curler2
        && req.body.categories
    ) {
        res.status(200).json({ error: ""})
    } else 
        res.status(400).json({ error: "not getting data" })
}