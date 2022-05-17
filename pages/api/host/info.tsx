import type { NextApiRequest, NextApiResponse } from 'next'
import { getAcceptedHosts, getPendingHosts, getRejectedHosts } from '../../../lib/handlers/hosts'
import { HostInfo } from '../../../lib/models'

type Data = {
    data: HostInfo[] | null
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const id: number = req.body.id
    let hostInfo: HostInfo[] = []

    try {
        if (id == 0) {
            hostInfo = await getPendingHosts()
        }
        else if (id == 1) {
            hostInfo = await getAcceptedHosts()
        }
        else if (id == 2) {
            hostInfo = await getRejectedHosts()
        }
    } catch (error: any) {
        res.status(404).json({ data: null })
        return
    }

    res.status(200).json({ data: hostInfo })
}
