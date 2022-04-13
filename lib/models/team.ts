export interface TeamInfo {
    teamId: number
    name: string
    rating: string
}

export interface TeamMember {
    memberId: number
    teamId: number
    name: string
    email?: string
}

export interface TeamCreationForm {
    email: string
    name: string
    curlers: Array<Partial<TeamMember>>
    categories: Array<number>
}
