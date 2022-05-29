import { Box, Flex, Text, TableContainer, Table, Thead, Tr, Td, Tbody, FormLabel, HStack, Link } from "@chakra-ui/react"
import { CONST_BORDER_RADIUS } from '../../../themes/constants'
import SideBySideContainer from '../../profile/SideBySideContainer';
import type { HostMatchResult } from '../../../lib/models/match'
import { GrFormEdit } from 'react-icons/gr'
import { m } from "framer-motion";
import {
    AiOutlineCheck,
    AiOutlineClose
} from 'react-icons/ai'
import {
    MdHorizontalRule
} from 'react-icons/md'


interface HostInfoBoxProps {
    hostMatches: HostMatchResult[]
    hostId: number
}

export default function HostInfoBox(props: HostInfoBoxProps) {

    const {
        hostMatches,
        hostId
    } = props

    const displayMatches = hostMatches.slice(0, 10)

    return (
        <>
            <Box h="75%">
                <Text
                    fontSize="2.5em"
                    fontWeight="bold"
                    marginTop="31px"
                    h="120px"
                >
                    Recently Added Matches
                </Text>
                <Flex
                    align="center"
                    minW="110px"
                    direction="column"
                    h="85%"

                >
                    {!(hostMatches.length === 0) &&
                        (<TableContainer w="90%" /* maxW="388px" */ minW="302px" overflow="hidden">
                            <Table variant='simple' size="sm" whiteSpace="normal">
                                <Thead>
                                    <Tr>
                                        <Td fontWeight="bold">Date</Td>
                                        <Td fontWeight="bold">Team One</Td>
                                        <Td fontWeight="bold">Team Two</Td>
                                        <Td display={{ base: "none", md: "table-cell" }}>{/* Placeholder */}</Td>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {displayMatches.map((match) => (
                                        <Tr key={`${match.matchId}`}>
                                            <Td>{match.date}</Td>
                                            {
                                                match.winner === 'team_id_1' &&
                                                <>
                                                    <Td>
                                                        <HStack>
                                                            <Box>
                                                                <AiOutlineCheck
                                                                    style={{ color: 'green' }}
                                                                />
                                                            </Box>
                                                            <Text>{match.team1}</Text>
                                                        </HStack>
                                                    </Td>
                                                    <Td>
                                                        <HStack>
                                                            <Box>
                                                                <AiOutlineClose
                                                                    style={{ color: 'red' }}

                                                                />
                                                            </Box>
                                                            <Text>{match.team2}</Text>
                                                        </HStack>
                                                    </Td>
                                                </>
                                            }
                                            {
                                                match.winner === 'team_id_2' &&
                                                <>
                                                    <Td>
                                                        <HStack>
                                                            <Box>
                                                                <AiOutlineClose
                                                                    style={{ color: 'red' }}
                                                                />
                                                            </Box>
                                                            <Text>{match.team1}</Text>
                                                        </HStack>
                                                    </Td>
                                                    <Td>
                                                        <HStack>
                                                            <Box>
                                                                <AiOutlineCheck
                                                                    style={{ color: 'green' }}
                                                                />
                                                            </Box>
                                                            <Text>{match.team2}</Text>
                                                        </HStack>
                                                    </Td>
                                                </>
                                            }
                                            {
                                                match.winner === 'tie' &&
                                                <>
                                                    <Td>
                                                        <HStack>
                                                            <Box>
                                                                <MdHorizontalRule
                                                                    style={{ color: 'blue' }}
                                                                />
                                                            </Box>
                                                            <Text>{match.team1}</Text>
                                                        </HStack>
                                                    </Td>
                                                    <Td>
                                                        <HStack>
                                                            <Box>
                                                                <MdHorizontalRule
                                                                    style={{ color: 'blue' }}
                                                                />
                                                            </Box>
                                                            <Text>{match.team2}</Text>
                                                        </HStack>
                                                    </Td>
                                                </>
                                            }
                                            <Td display={{ base: "none", md: "table-cell" }}>
                                                <FormLabel id={`edit-${match.matchId}`} srOnly>Edit</FormLabel>
                                                <GrFormEdit aria-labelledby={`edit-${match.matchId}`} />
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>)
                    }
                    {hostMatches.length === 0 &&
                        (
                            <Text
                                h={{ base: "62%", md: "78%" }}
                            >
                                No matches Found: <Link href={hostId ? `/hosts/${hostId}/add-match` : '/'} fontWeight="bold">Add Match</Link>
                            </Text>
                        )
                    }
                </Flex>
            </Box>
        </>
    );
}