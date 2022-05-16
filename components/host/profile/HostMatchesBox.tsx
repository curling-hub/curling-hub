import { Box, Flex, Text, TableContainer, Table, Thead, Tr, Td, Tbody, FormLabel, HStack } from "@chakra-ui/react"
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
}

export default function HostInfoBox(props: HostInfoBoxProps) {

    const {
        hostMatches,
    } = props

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
                    <TableContainer w="90%" /* maxW="388px" */ minW="302px" overflowY="auto">
                        <Table variant='simple' size="sm" whiteSpace="normal">
                            <Thead>
                                <Tr>
                                    <Td fontWeight="bold">Date</Td>
                                    <Td fontWeight="bold">Team One</Td>
                                    <Td fontWeight="bold">Team Two</Td>
                                    <Td>{/* Placeholder */}</Td>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {hostMatches.map((match) => (
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
                                        <Td>
                                            <FormLabel id={`edit-${match.matchId}`} srOnly>Edit</FormLabel>
                                            <GrFormEdit aria-labelledby={`edit-${match.matchId}`} />
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Flex>
            </Box>
        </>
    );
}