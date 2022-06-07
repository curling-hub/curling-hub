export interface RatingPeriod {
    ratingPeriodId: number
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
    ratingDeviation: number
    volatility: number
    ratingPeriodId: number
    RatingPeriod?: RatingPeriod
}
