export interface RatingPeriod {
    ratindPeriodId: number
    name: string
    startDate: Date
    endDate: Date
}

export interface GlickoVariable {
    id: number
    systemConstant: number
    defaultRating: number
    defaultRatingDeviation: number
    defaultVolatility: number
    currentRatingPeriodId: number
    version: string
    createdAt: Date
}

export interface TeamGlickoInfo {
    teamId: number
    rating: number
    ratingDeviation: number
    volatility: number
}

export interface RatingHistory {
    teamId: number
    rating: number
    ratindPeriodId: number
}
