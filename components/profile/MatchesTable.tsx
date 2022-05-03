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

interface MatchesTableProps {
    teamMatches?: TeamMatches[]
    teamName?: string
}

function outcome(winner: string, team: string) {
    if (winner == team)
        return "Win"
    else if (!winner)
        return "Tie"
    else
        return "Loss"
}

function formatDate(dateString: string) {
    const index_of_time: number = dateString.indexOf("GMT+0000")
    return dateString.substring(0, index_of_time)
}

export default function MatchesTable(props: MatchesTableProps) {

    const {
        teamMatches = []
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
                                <Td>{outcome(match.winner, match.team_1_name)}</Td>
                                <Td>{(match.team_1_name == props.teamName) ? match.team_1_name : match.team_2_name}</Td>
                                {/* <Td>{match.category}</Td> */}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
}

