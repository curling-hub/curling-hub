import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Footer from "../components/footer/footer";
import {
    Box,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Td,
    TableContainer,
    useMediaQuery,
    Flex,
    Spacer,
    SimpleGrid,
} from '@chakra-ui/react'
import { getPendingHosts } from '../lib/handlers/hosts'
import { useState, useEffect } from 'react'
import { HostInfo } from '../lib/models'
import AdminLayout from '../components/layouts/AdminLayout'
import { getSession, getSessionServerSideResult } from '../lib/auth/session'
import { serverSideRedirectTo } from '../lib/auth/redirect'
import { AccountType } from '../lib/models/accountType'
import CurloButton from '../components/buttons/CurloButton';

interface GlickoInformationProps {
}

const GlickoInformation: NextPage<GlickoInformationProps> = (props: GlickoInformationProps) => {
    const [isMedScreen] = useMediaQuery("(max-width: 1213px)")

    return (
        <>
            <Head>
                <title>Glicko Information | Curlo</title>
            </Head>
            <Box
                position="absolute"
                w="100%"
                minH="100%"
                bgGradient="linear-gradient(primary.purple, primary.white)"
            >
                <AdminLayout />
                <Box
                    paddingBottom="4rem"
                >
                    <Box
                        backgroundColor="primary.white"
                        flexDirection='column'
                        boxShadow='lg'
                        alignItems="center"
                        padding="1rem"
                        borderRadius="35px"
                        h="80vh"
                        maxW="100%"
                        textAlign="center"
                        top="0"
                        marginLeft={isMedScreen ? '1rem' : '4rem'}
                        marginRight={isMedScreen ? '1rem' : '4rem'}
                        overflow='auto'
                    >
                        <Text fontSize={isMedScreen ? '1.5rem' : '2.5rem'} marginTop="5px" fontWeight="bold">
                            Glicko Information
                        </Text>
                        <Flex alignItems={{ base: "center", md: "start" }} direction={{ base: 'column', md: 'row' }}>
                            <Spacer />
                            <Box
                                marginTop="32px"
                                marginBottom="50px"
                                width={{ base: "81%", md: "42%" }}
                                maxW="605px"
                                minW="374px"
                                height="100%"
                                textAlign="center"
                                alignItems="center"
                                top="0"
                            >
                                <Text
                                    fontSize="1.5em"
                                    fontWeight="bold"
                                    mb="20px"
                                    mt="5%"
                                >
                                    Calculate Period
                                </Text>
                                <CurloButton buttonText="Calculate" color="primary.green" width="64%" size="md" />
                                <Text
                                    fontSize="xs"
                                    fontWeight="bold"
                                    mt="5px"
                                >
                                    Period starting on 2022-03-31
                                </Text>
                                <Text
                                    fontSize="1.5em"
                                    fontWeight="bold"
                                    mt="18%"
                                >
                                    Glicko Defaults
                                </Text>
                                <SimpleGrid mt="20px" ml="20%" columns={2} spacing={3}>
                                    <Text
                                        fontSize="1.3em"
                                        fontWeight="bold"
                                        align="left"
                                    >
                                        Rating
                                    </Text>
                                    <Text fontSize="1.3em" > 1500 </Text>
                                    <Text
                                        fontSize="1.3em"
                                        fontWeight="bold"
                                        align="left"
                                    >
                                        Volatility
                                    </Text>
                                    <Text fontSize="1.3em" > 0.06 </Text>
                                    <Text
                                        fontSize="1.3em"
                                        fontWeight="bold"
                                        align="left"
                                    >
                                        Rating Deviation
                                    </Text>
                                    <Text fontSize="1.3em" > 200 </Text>
                                    <Text
                                        fontSize="1.3em"
                                        fontWeight="bold"
                                        align="left"
                                    >
                                        System Constant
                                    </Text>
                                    <Text fontSize="1.3em" > 0.5 </Text>
                                </SimpleGrid>
                            </Box>
                            <Spacer />
                            <Box
                                marginTop="32px"
                                marginBottom="50px"
                                width={{ base: "81%", md: "42%" }}
                                maxW="605px"
                                minW="374px"
                                height="100%"
                                textAlign="center"
                                top="0"
                            >
                                <Text
                                    fontSize="1.5em"
                                    fontWeight="bold"
                                    mt="5%"
                                >
                                    Past Periods
                                </Text>
                                <TableContainer w="90%" /* maxW="388px" */ minW="302px" overflow="hidden">
                                    <Table variant='simple' size="sm" whiteSpace="normal">
                                        <Thead>
                                            <Tr>
                                                <Td fontWeight="bold">Name</Td>
                                                <Td fontWeight="bold">Start Date</Td>
                                                <Td fontWeight="bold">End Date</Td>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            <Tr>
                                                <Td>2022-Q1</Td>
                                                <Td>2022-01-01</Td>
                                                <Td>2022-03-31</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>2021-Q4</Td>
                                                <Td>2021-10-01</Td>
                                                <Td>2021-12-31</Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </Box>
                            <Spacer />
                        </Flex>
                    </Box>
                </Box>
                <Footer />
            </Box >
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const sessionWrapper = await getSession(context)
    const { signedIn, signedUp, session } = await getSession(context)
    if (!signedIn || !signedUp || !session) {
        return getSessionServerSideResult(sessionWrapper)
    }

    if (session.user.account_type !== AccountType.ADMIN) {
        return serverSideRedirectTo('/')
    }

    return {
        props: {
        }
    }
}

export default GlickoInformation