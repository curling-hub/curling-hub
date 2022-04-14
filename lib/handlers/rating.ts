import { Op } from 'sequelize'
import * as DbModels from '../db_model'

/**
 * 
 * @param from Start date
 * @param to End date
 * @returns Array of matches and associated team information
 */
export async function getMatchesBetween(from: Date, to: Date) {
    const matches = await DbModels.MatchModel.findAll({
        where: {
            date: {
                [Op.between]: [from, to],
            },
        },
        include: [{
            model: DbModels.TeamInfoModel,
            as: 'Teams',
            required: true,     // INNER JOIN
            include: [{
                model: DbModels.TeamGlickoInfoModel,
                required: true, // INNER JOIN
            }],
        }],
    })
    const m = matches.map((m) => m.get())
    //console.log(m)
    return m
}


/**
 * 
 * @returns Array of all rating periods and associated glicko variables
 */
export async function getAllRatingPeriods() {
    const ratingPeriods = await DbModels.RatingPeriodModel.findAll({
        include: [{
            model: DbModels.GlickoVariableModel,
            required: true,     // INNER JOIN
        }],
    })
    const r = ratingPeriods.map((r) => r.get())
    //console.log(r)
    return r
}
