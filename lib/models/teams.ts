import { RatingPeriod, TeamGlickoInfo } from './glicko'
import type { HostInfo } from './host'
import type { MatchResult } from './match'
import type { TeamMember } from './team'

export interface TeamInfo {
    teamId: number
    name: string
    rating: string
}

export interface TeamContactInfo {
    teamName: string
    teamEmail: string
}

export interface TeamMatch extends MatchResult {
    host: HostInfo
    teams: TeamInfo[]
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
