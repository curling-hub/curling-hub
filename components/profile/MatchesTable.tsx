import {
    Table,
    Thead,
    Tbody,
    Tr,
    Td,
    TableContainer,
    HStack,
    Text,
    Link,
    Box,
    FormLabel
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

    const displayMatches = teamMatches.slice(0, 20)

    return (
        <>
            {!(teamMatches.length === 0) &&
                (<TableContainer h={{ base: "62%", md: "78%" }}>
                    <Table variant='simple' size="sm" whiteSpace="normal">
                        <Thead>
                            <Tr>
                                <Td fontWeight="bold">Date</Td>
                                <Td fontWeight="bold">Outcome</Td>
                                <Td fontWeight="bold">Opponent</Td>
                                {/* <Td fontWeight="bold">Category</Td> */}
                            </Tr>
                        </Thead>
                        <Tbody>
                            {displayMatches.map((match) => (
                                <Tr key={`${match.matchId}`}>
                                    <Td>{match.date}</Td>
                                    {/* <Td>{match.date}</Td> */}
                                    {
                                        matchResultToString(teamId || 0, match) === 'Win' &&
                                        <>
                                            <Td>
                                                <HStack>
                                                    <AiOutlineCheck
                                                        aria-labelledby='win'
                                                        style={{ color: 'green' }}
                                                    />
                                                    <FormLabel id="win">Win</FormLabel>
                                                </HStack>
                                            </Td>
                                        </>
                                    }
                                    {
                                        matchResultToString(teamId || 0, match) === 'Loss' &&
                                        <>
                                            <Td>
                                                <HStack>
                                                    <AiOutlineClose
                                                        aria-labelledby='loss'
                                                        style={{ color: 'red' }}
                                                    />
                                                    <FormLabel id="loss">Loss</FormLabel>
                                                </HStack>
                                            </Td>
                                        </>
                                    }
                                    {
                                        matchResultToString(teamId || 0, match) === 'Tie' &&
                                        <>
                                            <Td>
                                                <HStack>
                                                    <MdHorizontalRule
                                                        aria-labelledby='tie'
                                                        style={{ color: 'blue' }}
                                                    />
                                                    <FormLabel id="tie">Tie</FormLabel>
                                                </HStack>
                                            </Td>
                                        </>
                                    }
                                    <Td>{matchResultOpponentTeamName(teamId || 0, match)}</Td>
                                    {/* <Td>{match.category}</Td> */}
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>)
            }
            {teamMatches.length === 0 &&
                (
                    <Box
                        h={{ base: "48%", md: "72%" }}
                    >
                        <Text marginTop="60px">
                            No matches Found: <Link href={teamId ? `/teams/${teamId}/add-match` : '/'} fontWeight="bold">Add Match</Link>
                        </Text>
                    </Box>
                )
            }
        </>
    );
}

