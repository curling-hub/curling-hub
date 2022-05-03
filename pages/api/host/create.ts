import type { NextApiRequest, NextApiResponse } from 'next'

import { createHost } from '../../../lib/handlers/hosts'
import type { HostCreationForm } from '../../../lib/models/host'
import hostSignupSchema from '../../../components/host/create/schema'
import { getSession } from '../../../lib/auth/session'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    //console.log(req.body)
    try {
        // 1. Get user session
        const { signedIn, session } = await getSession({ req })
        if (!signedIn || !session) {
            res.status(403).json({ error: 'Unauthorized' })
            return
        }
        const { email, id } = session.user

        const form = await hostSignupSchema.validate(req.body)

        // TODO: use yup validation
        const hostCreationForm: HostCreationForm = {
            ...form,
            email: email as string,
            hostId: id,
            phoneNumber: form.phone,
            streetAddress: form.address,
        }
        console.log(hostCreationForm)
        const host = await createHost(hostCreationForm)
        console.log(host)
        res.status(200).json({ data: host })
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}
