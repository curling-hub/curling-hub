import type { NextApiRequest, NextApiResponse } from 'next'

import { createTeam } from '../../../lib/handlers/teams'
import { TeamCreationForm } from '../../../lib/models/team'
import { getSession } from '../../../lib/auth/session'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    //console.log(req.body)
    try {
        // 1. Get user session
        const { session } = await getSession({ req })
        if (!session || !session.user) {
            res.status(403).json({ error: 'Unauthorized' })
            return
        }
        const { email } = session.user

        const curlers = [
            req.body.curler1, req.body.curler2, req.body.curler3, req.body.curler4, req.body.alternative ]
            .filter((curlerInfo) => !!curlerInfo)
            .map((curlerInfo) => ({
                name: curlerInfo
            }))
        // TODO: use yup validation
        const teamCreationForm: TeamCreationForm = {
            email: email as string,
            name: req.body.team as string,
            curlers: curlers,
            categories: req.body.categories as Array<number>,
        }
        console.log(teamCreationForm)
        const team = await createTeam(teamCreationForm)
        //console.log(team)
        res.status(200).json({ data: team })
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}
