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
                        <Tr>
                            <Td>11/24/22</Td>
                            <Td>Win</Td>
                            <Td >The Sliders</Td>
                            <Td>Mixed</Td>
                        </Tr>
                        <Tr>
                            <Td>11/17/22</Td>
                            <Td>Win</Td>
                            <Td >The Sliders</Td>
                            <Td>Mixed</Td>
                        </Tr> {/* 5 Entries */}

                        {/* <Tr>
                            <Td>12/1/22</Td>
                            <Td>Win</Td>
                            <Td >The Sliders</Td>
                            <Td>Mixed</Td>
                        </Tr>
                        <Tr>
                            <Td>11/10/22</Td>
                            <Td>Win</Td>
                            <Td >The Sliders</Td>
                            <Td>Mixed</Td>
                        </Tr>
                        <Tr>
                            <Td>11/3/22</Td>
                            <Td>Win</Td>
                            <Td >The Sliders</Td>
                            <Td>Mixed</Td>
                        </Tr>
                        <Tr>
                            <Td>10/27/22</Td>
                            <Td>Win</Td>
                            <Td >The Sliders</Td>
                            <Td>Mixed</Td>
                        </Tr>
                        <Tr>
                            <Td>10/20/22</Td>
                            <Td>Win</Td>
                            <Td >The Sliders</Td>
                            <Td>Mixed</Td>
                        </Tr>
                        <Tr>
                            <Td>10/13/22</Td>
                            <Td>Win</Td>
                            <Td >The Sliders</Td>
                            <Td>Mixed</Td>
                        </Tr>
                        <Tr>
                            <Td>10/6/22</Td>
                            <Td>Win</Td>
                            <Td >The Sliders</Td>
                            <Td>Mixed</Td>
                        </Tr>
                        <Tr>
                            <Td>9/29/22</Td>
                            <Td>Win</Td>
                            <Td >The Sliders</Td>
                            <Td>Mixed</Td>
                        </Tr>
                        <Tr>
                            <Td>9/22/22</Td>
                            <Td>Win</Td>
                            <Td >The Sliders</Td>
                            <Td>Mixed</Td>
                        </Tr>
                        <Tr>
                            <Td>9/15/22</Td>
                            <Td>Win</Td>
                            <Td >The Sliders</Td>
                            <Td>Mixed</Td>
                        </Tr>
                        <Tr>
                            <Td>9/8/22</Td>
                            <Td>Win</Td>
                            <Td >The Sliders</Td>
                            <Td>Mixed</Td>
                        </Tr>
                        <Tr>
                            <Td>9/1/22</Td>
                            <Td>Win</Td>
                            <Td >The Sliders</Td>
                            <Td>Mixed</Td>
                        </Tr>
                        <Tr>
                            <Td>8/25/22</Td>
                            <Td>Win</Td>
                            <Td >The Sliders</Td>
                            <Td>Mixed</Td>
                        </Tr>
                        <Tr>
                            <Td>8/18/22</Td>
                            <Td>Win</Td>
                            <Td >The Sliders</Td>
                            <Td>Mixed</Td>
                        </Tr>
                        <Tr>
                            <Td>8/11/22</Td>
                            <Td>Win</Td>
                            <Td >The Sliders</Td>
                            <Td>Mixed</Td>
                        </Tr> */}

                        {/* 20 Entries */}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
}