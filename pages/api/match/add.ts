// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

import addMatchSchema from '../../../components/profile/addMatch/schema'


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
        
        // TODO: find out how the id should be handled - typically as auto-incremented int
        const query = ``

        // TODO: return message `Ok` and the created object
        res.status(200).json({ message: 'Ok' })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Bad parameters' })
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
