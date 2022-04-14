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
