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
                <Flex
                    align="center"
                    minW="110px"
                    direction="column"
                    h="100%"
                    marginTop="31px"
                >
                    <Text
                        fontSize="2.5em"
                        fontWeight="bold"
                        h="120px"
                    >
                        Recently Added Matches
                    </Text>
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
                                                        <AiOutlineCheck
                                                            style={{ color: 'green' }}
                                                        />
                                                        <Text>{match.team1}</Text>
                                                    </HStack>
                                                </Td>
                                                <Td>
                                                    <HStack>
                                                        <AiOutlineClose
                                                            style={{ color: 'red' }}
                                                        />
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
                                                        <AiOutlineClose
                                                            style={{ color: 'red' }}
                                                        />
                                                        <Text>{match.team1}</Text>
                                                    </HStack>
                                                </Td>
                                                <Td>
                                                    <HStack>
                                                        <AiOutlineCheck
                                                            style={{ color: 'green' }}
                                                        />
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
                                                        <MdHorizontalRule
                                                            style={{ color: 'blue' }}
                                                        />
                                                        <Text>{match.team1}</Text>
                                                    </HStack>
                                                </Td>
                                                <Td>
                                                    <HStack>
                                                        <MdHorizontalRule
                                                            style={{ color: 'blue' }}
                                                        />
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