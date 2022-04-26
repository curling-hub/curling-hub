/**
 * Using `.js` instead of `.ts due to lack of typing from `glicko2`.
 * 
 * Type definitions of functions in this file reside in `glicko.d.ts`.
 */

import { Glicko2 } from 'glicko2';

import * as DbModels from '../db_model'

/**
 * 
 * @param {MatchResultDetails[]} matches 
 * [ {
 *      "matchId":28,
 *      "hostId":"cc1d5bdd-c18e-4b93-8c4f-98bc8699f079",
 *      "teamId1":1,
 *      "teamId2":63,
 *      "winner":"tie",
 *      "sheetOfIce":"Right Sheet",
 *      "comments":null,
 *      "date":"2022-04-14T00:00:00.000Z",
 *      "teams":[
 *        {
 *          "teamId":1,
 *          "name":"The Sliding Stones",
 *          "teamGlickoInfo": {
 *            "teamId":1,
 *            "rating":760,
 *            "ratingDeviation":1,
 *            "volatility":1
 *          }
 *        },
 *        {
 *          "teamId":63,
 *          "name":"Team-A",
 *          "teamGlickoInfo":{
 *            "teamId":63,
 *            "rating":650,
 *            "ratingDeviation":1,
 *            "volatility":1
 *          }
 *        }
 *      ]
 *   },
 * ]
 * @param settings Glicko settings
 * @returns Array of `TeamRating`  [ { teamId: 1, rating: 670.0 }, { teamId: 2, rating: 700.0 } ]
 * 
 * Refer to `glicko.d.ts`
 */
export function computeRatings(matches, teams, settings) {
    // 1. Create glicko2 instance
    const ranking = new Glicko2({
        tau:    settings.systemConstant,
        rating: settings.defaultRating,
        rd:     settings.defaultRatingDeviation,
        vol:    settings.defaultVolatility,
    })
    // 2. Map teamId to team
    const teamById = new Map()
    teams.forEach((teamInfo) => {
        let teamGlicko = null
        if (teamInfo.teamGlickoInfo) {
            teamGlicko = ranking.makePlayer(
                teamInfo.teamGlickoInfo.rating,
                teamInfo.teamGlickoInfo.ratingDeviation,
                teamInfo.teamGlickoInfo.volatility,
            )
        } else {
            teamGlicko = ranking.makePlayer()
        }
        teamById.set(teamInfo.teamId, teamGlicko)
    })
    // 3. Map matches to glicko2 matches [ team1, team2, result ]
    const glickoMatches = matches.map((match) => {
        const team1 = teamById.get(match.teamId1)
        const team2 = teamById.get(match.teamId2)
        let score = 0.5
        switch(match.winner) {
            case 'tie':
                score = 0.5
                break
            case 'team_id_1':
                score = 1
                break
            case 'team_id_2':
                score = 0
                break
        }
        return [ team1, team2, score ]
    })
    ranking.updateRatings(glickoMatches)
    // 4. Map team to new rating
    const ratings = teams
        .map((teamInfo) => {
            const team = teamById.get(teamInfo.teamId)
            return team && {
                teamId: teamInfo.teamId,
                rating: team.getRating(),
                ratingDeviation: team.getRd(),
                volatility: team.getVol(),
            }
        })
        .filter((result) => !!result)   // Remove nulls
    return ratings
}
