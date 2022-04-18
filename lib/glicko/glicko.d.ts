import { TeamInfo } from "../models";
import type { GlickoVariable, TeamRating } from "../models/glicko";
import type { MatchResultDetails } from "../models/match";

export function computeRatings(
    matches: MatchResultDetails[],
    teams: TeamInfoRatings[],
    settings: GlickoVariable,
): TeamGlickoInfo[]
