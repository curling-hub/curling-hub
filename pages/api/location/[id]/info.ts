// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { getHostInfoById } from '../../../../lib/handlers/hosts'
import type { HostInfo } from '../../../../lib/models'

type Data = {
    data: HostInfo | null
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { id: host_id } = req.query
    const hostId = Array.isArray(host_id) ? host_id[0] : host_id
    const hostInfo = await getHostInfoById(hostId)
    //console.log(hostInfo)
    if (hostInfo === null) {
        res.status(404).json({ data: null })
        return
    }
    res.status(200).json({ data: hostInfo })
}

