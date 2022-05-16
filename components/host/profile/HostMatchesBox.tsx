import { Box, Flex, Text, TableContainer, Table, Thead, Tr, Td, Tbody, FormLabel } from "@chakra-ui/react"
import { CONST_BORDER_RADIUS } from '../../../themes/constants'
import SideBySideContainer from '../../profile/SideBySideContainer';
import type { HostMatchResult } from '../../../lib/models/match'
import { GrFormEdit } from 'react-icons/gr'



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
                                        <Td>{match.team1}</Td>
                                        <Td>{match.team2}</Td>
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