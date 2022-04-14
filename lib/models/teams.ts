export interface TeamInfo {
    teamId: string
    name: string
    rating: string
}

export interface TeamContactInfo {
    teamName: string
    teamEmail: string
}

export interface TeamMatches {
    matchId: string
    team_1_name: string
    team_2_name: string
    winner: string
    category: string
    date: string
}

export interface TeamCategories {
    categoryName: string
}

export interface TeamMembers {
    memberName: string
}

export interface TeamRanking {
    team_id: number
    team_name: string
    rating: number
    /* changes: number // TODO: account for ranking change */
    players: string[]
}