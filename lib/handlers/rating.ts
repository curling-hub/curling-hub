import { Op, DataTypes } from 'sequelize'
import moment from 'moment'

import { sequelize } from '../db'
import * as DbModels from '../db_model'
import { RatingPeriod, TeamGlickoInfo } from '../models/glicko'
import { MatchResultDetails } from '../models/match'
import { TeamInfoRatings } from '../models/team'

/**
 * 
 * @param from Start date
 * @param to End date
 * @returns Array of matches and associated team information
 */
export async function getMatchesBetween(from: Date, to: Date): Promise<MatchResultDetails[]> {
    const matches = await DbModels.MatchModel.findAll({
        where: {
            date: {
                [Op.between]: [from, to],
            },
        },
        order: [['date', 'ASC']],
        include: [{
            model: DbModels.TeamInfoModel,
            as: 'teams',
            required: true,     // INNER JOIN
            include: [{
                model: DbModels.TeamGlickoInfoModel,
                required: true, // INNER JOIN
                as: 'teamGlickoInfo',
            }],
        }],
    })
    const m: MatchResultDetails[] = matches.map((m): any => m.toJSON())
    //console.log(m)
    return m
}


/**
 * 
 * @returns Array of all rating periods and associated glicko variables
 */
export async function getAllRatingPeriods() {
    const ratingPeriods = await DbModels.RatingPeriodModel.findAll({
        /*
        Get latest glicko_variables for rating_periods

        SELECT MAX(glicko_variables.id)
        FROM glicko_variables
        JOIN rating_periods
        ON glicko_variables.created_at < rating_periods.end_date
        WHERE rating_periods.rating_period_id = ?;
        */
        include: [{
            model: DbModels.GlickoVariableModel,
            required: true,     // INNER JOIN
            as: 'glickoVariable',
        }],
    })
    const r = ratingPeriods.map((r) => r.toJSON())
    return r
}


export async function getAllTeamRatings(): Promise<TeamInfoRatings[]> {
    const teamInfoList = await DbModels.TeamInfoModel.findAll({
        include: [{
            model: DbModels.TeamGlickoInfoModel,
            as: 'teamGlickoInfo',
        }],
    })
    const t: TeamInfoRatings[] = teamInfoList.map((t): any => t.toJSON())
    return t
}


/**
 * 
 * @returns 
 * {
        id: 1,
        systemConstant: 0.5,
        defaultRating: 600,
        defaultRatingDeviation: 200,
        defaultVolatility: 0.06,
        currentRatingPeriodId: 2,
        version: '1.0',
        createdAt: 2022-04-15T19:08:42.000Z
    }
 */
export async function getCurrentSettings() {
    const currentR = await DbModels.GlickoVariableModel.findOne()
    return currentR?.toJSON()
}


/**
 * 
 * @returns 
 *  {
        ratingPeriodId: 2,
        name: '2022-Q2',
        startDate: 2022-04-01T00:00:00.000Z,
        endDate: 2022-06-30T23:59:59.000Z
    }
 */
export async function getLatestRatingPeriod(): Promise<RatingPeriod | null | undefined> {
    const currentR = await DbModels.RatingPeriodModel.findOne({
        order: [['end_date', 'DESC']]
    })
    return currentR?.toJSON()
}


/**
 * 
 * @param ratingPeriodId 
 * @param teamRatings Computed glicko ratings
 */
export async function updateRatingForRatingPeriod(ratingPeriodId: number, teamRatings: TeamGlickoInfo[]) {
    await sequelize.transaction(async (t) => {
        // 1. Update team glicko ratings
        const updatePromises = teamRatings.map((updateInfo) => (
            DbModels.TeamGlickoInfoModel.update(updateInfo, {
                where: {
                    teamId: updateInfo.teamId,
                },
                transaction: t,
            })
        ))
        await Promise.all(updatePromises)
        // 2. Update team rating history
        const ratingHistoryUpdate = teamRatings.map((ratingInfo) => ({
            teamId: ratingInfo.teamId,
            rating: ratingInfo.rating,
            ratingPeriodId: ratingPeriodId,
        }))
        const ratingHistoryPromise = DbModels.RatingHistoryModel.bulkCreate(ratingHistoryUpdate, {
            transaction: t,
        })
        await ratingHistoryPromise
        // ======= Testing, don't commit =======
        await t.rollback()
    })
}
