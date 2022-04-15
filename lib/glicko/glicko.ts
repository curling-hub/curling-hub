import { pool } from '../db';

var glicko2 = require('glicko2');

// Use glicko2 to update team ratings

// TODO: Use sequelize
const query_teams = `
    SELECT
        team_profile.team_id,
        team_glicko_info.rating,
        team_glicko_info.rating_deviation,
        team_glicko_info.volatility
    FROM team_profile
    JOIN team_glicko_info
    ON team_profile.team_id = team_glicko_info.team_id
`
const rows = pool.query(query_teams);