import {
    Table,
    Thead,
    Tbody,
    Tr,
    Td,
    TableCaption,
    TableContainer,
} from "@chakra-ui/react"
import { TeamMatches } from '../../lib/models/teams'
import { matchResultOpponentTeamName, matchResultToString } from '../../lib/utils/match'

interface MatchesTableProps {
    teamMatches?: TeamMatches[]
    teamName?: string
    teamId?: number
}

function outcome(winner: string, team: string) {
    if (winner == team)
        return "Win"
    else if (!winner)
        return "Tie"
    else
        return "Loss"
}

export default function MatchesTable(props: MatchesTableProps) {

    const {
        teamId,
        teamMatches = [],
    } = props

    return (
        <>
            <TableContainer /* padding=" 0 5px" */>
                <Table variant='simple' size="sm">
                    <TableCaption>Most recent matches</TableCaption>
                    <Thead textAlign="center">
                        <Tr>
                            <Td fontWeight="bold">Date</Td>
                            <Td fontWeight="bold">Outcome</Td>
                            <Td fontWeight="bold">Opponent</Td>
                            {/* <Td fontWeight="bold">Category</Td> */}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {teamMatches.map((match) => (
                            <Tr key={`${match.matchId}`}>
                                <Td>{match.date}</Td>
                                {/* <Td>{match.date}</Td> */}
                                <Td>{matchResultToString(teamId || 0, match)}</Td>
                                <Td>{matchResultOpponentTeamName(teamId || 0, match)}</Td>
                                {/* <Td>{match.category}</Td> */}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
}

