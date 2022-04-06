// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import pool from '../../../lib/db'

type Data = {
    error: string
}

export default async function handler(
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
        var query = `INSERT INTO team_profile(name, rating)\nVALUES("${req.body.team}", "750");
                     INSERT INTO categories_rel(team_id, category_id)
                     VALUES`
        for (var category of req.body.categories) {
            query += `(LAST_INSERT_ID(), ${category}),`
        }
        query = query.slice(0, query.length - 1) + `;\n`
        query += `INSERT INTO team_members(team_id, name)
                  VALUES(LAST_INSERT_ID() "${req.body.curler1}"),(LAST_INSERT_ID(), "${req.body.curler2}"),
                  (LAST_INSERT_ID(), "${req.body.curler3}"),(LAST_INSERT_ID(), "${req.body.curler4}"),
                  (LAST_INSERT_ID(), "${req.body.alternate}");`
          
        try {
            let qr = await pool.promise().query(query)
            res.status(200).json({ error: ""})
        } catch (e: any) {
            res.status(500).json({error: e.code})
        }
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
        var query = `INSERT INTO team_profile(name, rating)\nVALUES("${req.body.team}", "750");
                     INSERT INTO categories_rel(team_id, category_id)
                     VALUES`
        for (var category of req.body.categories) {
            query += `(LAST_INSERT_ID(), ${category}),`
        }
        query = query.slice(0, query.length - 1) + `;\n`
        query += `INSERT INTO team_members(team_id, name)
                  VALUES(LAST_INSERT_ID(), "${req.body.curler1}"),(LAST_INSERT_ID(), "${req.body.curler2}"),
                  (LAST_INSERT_ID(), "${req.body.curler3}"),(LAST_INSERT_ID(), "${req.body.curler4}");`
          
        try {
            let qr = await pool.promise().query(query)
            res.status(200).json({ error: ""})
        } catch (e: any) {
            res.status(500).json({error: e.code})
        }
    } else if (
        req.body.team 
        && req.body.curler1 
        && req.body.curler2
        && req.body.categories
    ) {
        console.log(req.body.categories)
        var query = `INSERT INTO team_profile(name, rating)\nVALUES("${req.body.team}", "750");
                     INSERT INTO categories_rel(team_id, category_id)
                     VALUES`
        for (var category of req.body.categories) {
            query += `(LAST_INSERT_ID(), ${category}),`
        }
        query = query.slice(0, query.length - 1) + `;\n`
        query += `INSERT INTO team_members(team_id, name)
                  VALUES(LAST_INSERT_ID(), "${req.body.curler1}"),(LAST_INSERT_ID(), "${req.body.curler2}"),
                  `
         
        try {
            let qr = await pool.promise().query(query)
            res.status(200).json({ error: ""})
        } catch (e: any) {
            res.status(500).json({error: e.code})
        }
    } else 
        res.status(400).json({ error: "missing team information" }) 
}