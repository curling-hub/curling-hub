import type { TeamMatches } from '../models/teams'

export function matchResultToString(currentTeamId: number, matchResult: TeamMatches): string {
    console.log(currentTeamId, matchResult)
    if (currentTeamId !== matchResult.teamId1 && currentTeamId !== matchResult.teamId2) {
        return 'N/A'
    }
    switch (matchResult.winner) {
        case 'tie':
            return 'Tie'
        case 'team_id_1':
            return currentTeamId === matchResult.teamId1 ? 'Win' : 'Loss'
        case 'team_id_2':
            return currentTeamId === matchResult.teamId2 ? 'Win' : 'Loss'
        default:
            return 'N/A'
    }
}

export function matchResultOpponentTeamName(currentTeamId: number, matchResult: TeamMatches): string {
    console.log(currentTeamId, matchResult)
    if (currentTeamId !== matchResult.teamId1 && currentTeamId !== matchResult.teamId2) {
        return 'N/A'
    }
    if (matchResult.teams[0].teamId === currentTeamId) {
        return matchResult.teams[1].name
    }
    if (matchResult.teams[1].teamId === currentTeamId) {
        return matchResult.teams[0].name
    }
    return 'N/A'
}
