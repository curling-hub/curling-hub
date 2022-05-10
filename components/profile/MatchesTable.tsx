import {
    Table,
    Thead,
    Tbody,
    Tr,
    Td,
    TableCaption,
    TableContainer,
    HStack,
    Text,
    Box,
} from "@chakra-ui/react"
import {
    AiOutlineCheck,
    AiOutlineClose
} from 'react-icons/ai'
import {
    MdHorizontalRule
} from 'react-icons/md'
import type { TeamMatch } from '../../lib/models/teams'
import { matchResultOpponentTeamName, matchResultToString } from '../../lib/utils/match'

interface MatchesTableProps {
    teamMatches?: TeamMatch[]
    teamName?: string
    teamId?: number
}

export default function MatchesTable(props: MatchesTableProps) {

    const {
        teamId,
        teamMatches = [],
    } = props

    return (
        <>
            <Box h={{ base: "75%", md: "78%" }}>
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
                                    {
                                        matchResultToString(teamId || 0, match) === 'Win' &&
                                        <Td>
                                            <HStack>
                                                <AiOutlineCheck
                                                    style={{ color: 'green' }}
                                                />
                                                <Text>{matchResultToString(teamId || 0, match)}</Text>
                                            </HStack>
                                        </Td>
                                    }
                                    {
                                        matchResultToString(teamId || 0, match) === 'Loss' &&
                                        <Td>
                                            <HStack>
                                                <AiOutlineClose
                                                    style={{ color: 'red' }}
                                                />
                                                <Text>{matchResultToString(teamId || 0, match)}</Text>
                                            </HStack>
                                        </Td>
                                    }
                                    {
                                        matchResultToString(teamId || 0, match) === 'Tie' &&
                                        <Td>
                                            <HStack>
                                                <MdHorizontalRule
                                                    style={{ color: 'blue' }}
                                                />
                                                <Text>{matchResultToString(teamId || 0, match)}</Text>
                                            </HStack>
                                        </Td>
                                    }
                                    <Td>{matchResultOpponentTeamName(teamId || 0, match)}</Td>
                                    {/* <Td>{match.category}</Td> */}
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
}

