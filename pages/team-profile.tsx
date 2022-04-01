import type { NextPage } from 'next'
import Head from 'next/head'
import TeamLayout from '../components/layouts/TeamLayout'
import { Box, Button, Text, Flex, Spacer, Link, Table, VStack, HStack } from "@chakra-ui/react";
import { REG_BUTTON_FONT_SIZE, CONST_BORDER_RADIUS } from "../themes/constants";
import {

    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
const TeamProfile: NextPage = () => {
    return (
        <>
            <Head>
                <title>Team Profile | Curlo</title>
            </Head>
            <Box
                position="absolute"
                w="100%"
                h="100vh"
                bgGradient="linear-gradient(primary.purple, primary.white)"
            >
                <TeamLayout />


                <Flex alignItems="center" direction={{ base: "column", md: "row" }}>
                    <Spacer />
                    <Box

                        alignItems="center"

                        borderRadius={CONST_BORDER_RADIUS}
                        marginTop="37px"
                        marginBottom="50px"
                        textAlign="center"

                        width="320px"
                        height="550px"
                    >
                        <VStack spacing="50px">
                            <Box
                                background="primary.white"
                                alignItems="center"

                                borderRadius={CONST_BORDER_RADIUS}
                                boxShadow="md"
                                textAlign="center"
                                width="320px"
                                height="250px"
                            >
                                <VStack spacing="-5px">
                                    <Text
                                        fontSize="30px"
                                        fontWeight="bold"
                                    >
                                        Team Name
                                    </Text>
                                    <Text
                                        fontSize="17px"
                                        fontWeight="bold"
                                    >
                                        Contact
                                    </Text>
                                    <Text>
                                        email
                                    </Text>
                                    <Table variant="unstyled" size="sm">
                                        <Tbody>
                                            <Tr>
                                                <Td textAlign='center' fontWeight="bold" fontSize="17px">Curlers</Td>
                                                <Td textAlign='center' fontWeight="bold" fontSize="17px">Categories</Td>
                                            </Tr>
                                            <Tr>
                                                <Td textAlign='center' fontSize="14px">Standin Name</Td>
                                                <Td textAlign='center' fontSize="14px">Mixed</Td>
                                            </Tr>
                                            <Tr>
                                                <Td textAlign='center' fontSize="14px">Standin Name</Td>
                                                <Td textAlign='center' fontSize="14px">Open</Td>
                                            </Tr>
                                            <Tr>
                                                <Td textAlign='center' fontSize="14px">Standin Name</Td>
                                                <Td textAlign='center' fontSize="14px"></Td>
                                            </Tr>
                                            <Tr>
                                                <Td textAlign='center' fontSize="14px">Standin Name</Td>
                                                <Td textAlign='center' fontSize="14px"></Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                </VStack>
                            </Box>
                            <Box
                                background="primary.green"
                                alignItems="center"
                                padding="1rem"
                                borderRadius={CONST_BORDER_RADIUS}
                                boxShadow="md"
                                textAlign="center"
                                width="320px"
                                height="250px"
                            >
                                <Text>Rating</Text>
                            </Box>

                        </VStack>
                    </Box>{" "}
                    {/*Card1}*/}
                    <Spacer />
                    {/*Card 2 */}
                    <Box
                        background="primary.white"
                        alignItems="center"
                        padding="1rem"
                        borderRadius={CONST_BORDER_RADIUS}
                        marginTop="37px"
                        marginBottom="50px"
                        boxShadow="lg"
                        width="550px"
                        height="550px"
                        textAlign="center"
                    >
                        <Text fontSize="2.5rem" marginTop="5px" fontWeight="bold">
                            Matches
                        </Text>
                        <TableContainer >
                            <Table variant='simple'>
                                <TableCaption>Most recent matches</TableCaption>
                                <Thead>
                                    <Tr>
                                        <Th>Date</Th>
                                        <Th>Outcome</Th>
                                        <Th>Opponent</Th>
                                        <Th>Category</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td>12/1/22</Td>
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
                                        <Td>12/14/22</Td>
                                        <Td>Win</Td>
                                        <Td >The Sliders</Td>
                                        <Td>Mixed</Td>
                                    </Tr>
                                </Tbody>
                                <Tfoot>
                                    <Tr>
                                        <Th>Date</Th>
                                        <Th>Outcome</Th>
                                        <Th>Opponent</Th>
                                        <Th>Category</Th>
                                    </Tr>
                                </Tfoot>
                            </Table>
                        </TableContainer>
                        <Box marginTop="63px">
                            <Link href="/ratings">
                                <Button
                                    background="primary.green"
                                    borderRadius="full"
                                    boxShadow="md"
                                    padding="25px 50px"
                                    fontSize={REG_BUTTON_FONT_SIZE}
                                >
                                    View Matches
                                </Button>
                            </Link>
                        </Box>
                    </Box>{" "}
                    {/*Card2}*/}
                    <Spacer />

                </Flex>{" "}



            </Box>
        </>
    )
}

export default TeamProfile

