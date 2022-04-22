// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

import addMatchSchema from '../../../../components/host/addMatch/schema'
import { create } from '../../../../lib/handlers/matches'


type Data = {
    message?: string
    error?: string
}

type MethodHandler = {
    [key: string]: Function
}

const postHandler: NextApiHandler<Data> = async (req, res) => {
    try {
        const form = await addMatchSchema.validate(req.body)
        console.log(form)
        
        await create(form)

        // TODO: return message `Ok` and the created object
        res.status(200).json({ message: 'Ok' })
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
    res: NextApiResponse<Data>
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
