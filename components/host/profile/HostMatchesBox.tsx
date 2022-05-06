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
            <Flex
                align="center"
                minW="110px"
                direction="column"
                h="60%"
                marginTop="31px"
            >
                <Text
                    fontSize="2.5em"
                    fontWeight="bold"
                    h="120px"
                >
                    Recently Added Matches
                </Text>
                <TableContainer w="75%" maxW="388px" minW="302px" overflowY="scroll">
                        <Table variant='simple' size="sm" whiteSpace="normal">
                        <Thead>
                            <Tr>
                                <Td fontWeight="bold">Date</Td>
                                <Td fontWeight="bold">Team One</Td>
                                <Td fontWeight="bold">Team Two</Td>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {hostMatches.map((match) => {
                                return <Tr key={`${match.matchId}`}>
                                    <td>{match.date}</td>
                                    <td>{match.team1}</td>
                                    <td>{match.team2}</td>
                                    <td>
                                        <FormLabel id={`edit-${match.matchId}`} srOnly>Edit</FormLabel>
                                        <GrFormEdit aria-labelledby={`edit-${match.matchId}`} />
                                    </td>
                                </Tr>
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Flex>
        </>
    );
}