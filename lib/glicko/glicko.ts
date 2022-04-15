import mysql from 'mysql2';
import glicko from 'glicko2';

// Use glicko2 to update team ratings

// TODO: Use sequelize
// SELECT team_profile.team_id, team_glicko_info.rating, team_glicko_info.rating_deviation, team_glicko_info.volatility
// FROM team_profile
// JOIN team_glicko_info ON team_profile.team_id = team_glicko_info.team_id;