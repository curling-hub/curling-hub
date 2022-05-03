import type { NextApiRequest, NextApiResponse } from 'next'
import { updateHost } from '../../../lib/handlers/hosts'
import { HostInfo } from '../../../lib/models'

type Data = {
    hostId: string,
    newStatus: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req && req.body) {
        try {
            await updateHost(req.body.hostId, req.body.newStatus)
            return res.status(200).end()
        }
        catch (e: any) {
            console.log(e)
            return res.status(500).end()
        }
    }

    return res.status(404).end()
}