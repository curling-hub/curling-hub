import * as DbModels from '../db_model'

import type { TeamInfo } from '../models'


export async function teams() {
    return 0
}

export async function getAllTeams(): Promise<TeamInfo[]> {
    return await DbModels.TeamInfoModel.findAll({
        raw: true,
    })
}

export async function getTeamById(teamId: number): Promise<TeamInfo | null> {
    return await DbModels.TeamInfoModel.findOne({
        where: {
            teamId: teamId,
        },
        raw: true,
    })
}
