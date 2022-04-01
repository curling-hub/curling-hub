import {
    Table,
    Thead,
    Tbody,
    Tr,
    Td,
    TableCaption,
    TableContainer,
} from "@chakra-ui/react"

interface MatchesTableProps {

}

export default function MatchesTable(props: MatchesTableProps) {
    return (
        <>
            <TableContainer padding=" 0 5%">
                <Table variant='simple' size="sm">
                    <TableCaption>Most recent matches</TableCaption>
                    <Thead textAlign="center">
                        <Tr>
                            <Td fontWeight="bold">Date</Td>
                            <Td fontWeight="bold">Outcome</Td>
                            <Td fontWeight="bold">Opponent</Td>
                            <Td fontWeight="bold">Category</Td>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>12/14/22</Td>
                            <Td>Win</Td>
                            <Td>The Sliders</Td>
                            <Td>Mixed</Td>
                        </Tr>
                        <Tr>
                            <Td>12/7/22</Td>
                            <Td>Loss</Td>
                            <Td >The Sliders</Td>
                            <Td>Mixed</Td>
                        </Tr>
                        <Tr>
                            <Td>12/1/22</Td>
                            <Td>Win</Td>
                            <Td >The Sliders</Td>
                            <Td>Mixed</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
}