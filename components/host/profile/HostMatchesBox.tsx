import { Box, Flex, Text, TableContainer, Table, Thead, Tr, Td, Tbody } from "@chakra-ui/react"
import { CONST_BORDER_RADIUS } from '../../../themes/constants'
import SideBySideContainer from '../../profile/SideBySideContainer';
import type { MatchResult } from '../../../lib/models/match'



interface HostInfoBoxProps {
    currentMatches: MatchResult[]
}

export default function HostInfoBox(props: HostInfoBoxProps) {

    const {
        currentMatches,
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
                <TableContainer w="75%" maxW="388px" minW="302px">
                    <Table variant='simple' size="sm">
                        <Thead>
                            <Tr>
                                <Td fontWeight="bold">Date</Td>
                                <Td fontWeight="bold">Team One</Td>
                                <Td fontWeight="bold">Team Two</Td>
                            </Tr>
                        </Thead>
                        <Tbody>

                        </Tbody>
                    </Table>
                </TableContainer>
            </Flex>
        </>
    );
}