import { TeamInfo } from "./team"

export interface MatchCreationForm {
    currentTeam: number,
    matchResult: string,
    date: Date,
    opponent: number,
    location: string,
    sheetOfIce: string | null,
    comments?: string | null,
}

export interface MatchResult {
    matchId: number
    hostId: string
    teamId1: number
    teamId2: number
    winner: string
    sheetOfIce: string | null
    comments: string | null
    date: Date
}

export interface MatchResultDetails extends MatchResult {
    teams: TeamInfo[],
}
export interface Filter {
    filter_id: number
    value: string
}
export interface Filter {
    filter_id: number
    value: string
}

export interface HostMatchResult {
    matchId: number
    team1: string
    team2: string
    date: string
}
