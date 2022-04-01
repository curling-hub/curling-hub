import {
    Table,
    Thead,
    Tbody,
    Tr,
    Td,
    TableCaption,
    TableContainer,
} from "@chakra-ui/react"

interface MembersTableProps {

}

export default function MembersTable(props: MembersTableProps) {
    return (
        <>
            {/* <TableContainer padding="0"> */}
            <Table variant="unstyled" size="sm" padding="0 5%">
                <Tbody>
                    <Tr>
                        <Td textAlign='center' fontWeight="bold" fontSize="1.25em">Curlers</Td>
                        <Td textAlign='center' fontWeight="bold" fontSize="1.25em">Categories</Td>
                    </Tr>
                    <Tr>
                        <Td textAlign='center' fontSize="14px">Stand-In Name</Td>
                        <Td textAlign='center' fontSize="14px">Mixed</Td>
                    </Tr>
                    <Tr>
                        <Td textAlign='center' fontSize="14px">Stand-In Name</Td>
                        <Td textAlign='center' fontSize="14px">Open</Td>
                    </Tr>
                    <Tr>
                        <Td textAlign='center' fontSize="14px">Stand-In Name</Td>
                        <Td textAlign='center' fontSize="14px"></Td>
                    </Tr>
                    <Tr>
                        <Td textAlign='center' fontSize="14px">Stand-In Name</Td>
                        <Td textAlign='center' fontSize="14px"></Td>
                    </Tr>
                </Tbody>
            </Table>
            {/* </TableContainer> */}
        </>
    );
}