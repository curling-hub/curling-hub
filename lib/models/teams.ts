import { RatingPeriod, TeamGlickoInfo } from './glicko'
import { TeamMember } from './team'

export interface TeamInfo {
    teamId: number
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

export interface RatingPeriodExt extends RatingPeriod {
    RatingHistory: TeamGlickoInfo
}

export interface TeamWithMembersAndRatings extends TeamInfo {
    members: TeamMember[]
    teamGlickoInfo: TeamGlickoInfo
    ratingPeriods: RatingPeriodExt[]
}

export interface TeamRanking {
    ID: number
    Team: string
    Rating: number
    Changes: number[] | null 
    Players: string[]
}

export interface TeamMatch {
    date: string
    outcome: string
    opponent: string
    location: string
    sheetOfIce: string
    comment: string
}