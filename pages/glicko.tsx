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
import React, { useState, useEffect } from 'react'
import { HostInfo } from '../lib/models'
import AdminLayout from '../components/layouts/AdminLayout'
import { getSession, getSessionServerSideResult } from '../lib/auth/session'
import { serverSideRedirectTo } from '../lib/auth/redirect'
import { AccountType } from '../lib/models/accountType'
import CurloButton from '../components/buttons/CurloButton';
import { getAllRatingPeriods, getCurrentSettings } from '../lib/handlers/rating';
import moment from 'moment';

interface GlickoVars {
    Rating: number,
    Volatility: number,
    RatingDeviation: number,
    SystemConstant: number
}

interface Period {
    Name: string,
    Start: string,
    End: string
}

interface GlickoInformationProps {
    glicko: GlickoVars,
    periods: Period[]
}

const GlickoInformation: NextPage<GlickoInformationProps> = (props: GlickoInformationProps) => {
    const [isMedScreen] = useMediaQuery("(max-width: 1213px)")
    const {
        glicko,
        periods
    } = props
    const [nextQuarter, setNextQuarter] = useState('2022-01-01')
    const [refreshKey, setRefreshKey] = useState(0)

    async function calculatePeriod() {
        await fetch('/api/rating/newperiod', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(
            (result) => {
                console.log(result)
            }
        ).catch((e: any) => console.log(e))
        
        setRefreshKey(refreshKey + 1)
    }

    useEffect(() => {
        fetch('/api/rating/getnextperiod', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then((res) => {
            if (res.status == 200) {
                res.json().then(
                    (result) => setNextQuarter(getDate(result.data))
                )
            }
        }).catch((e: any) => console.log(e))
    }, [refreshKey])

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
                                <CurloButton 
                                    buttonText="Calculate" 
                                    color="primary.green" 
                                    width="64%" 
                                    size="md" 
                                    onClick={async () => { await calculatePeriod() }}
                                />
                                <Text
                                    fontSize="xs"
                                    fontWeight="bold"
                                    mt="5px"
                                >
                                    Period starting on {nextQuarter}
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
                                    <Text fontSize="1.3em" > {glicko.Rating} </Text>
                                    <Text
                                        fontSize="1.3em"
                                        fontWeight="bold"
                                        align="left"
                                    >
                                        Volatility
                                    </Text>
                                    <Text fontSize="1.3em" > {glicko.Volatility} </Text>
                                    <Text
                                        fontSize="1.3em"
                                        fontWeight="bold"
                                        align="left"
                                    >
                                        Rating Deviation
                                    </Text>
                                    <Text fontSize="1.3em" > {glicko.RatingDeviation} </Text>
                                    <Text
                                        fontSize="1.3em"
                                        fontWeight="bold"
                                        align="left"
                                    >
                                        System Constant
                                    </Text>
                                    <Text fontSize="1.3em" > {glicko.SystemConstant} </Text>
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
                                            {React.Children.toArray(
                                                periods && periods.map((p) =>
                                                    <Tr>
                                                        <Td>{p.Name}</Td>
                                                        <Td>{p.Start}</Td>
                                                        <Td>{p.End}</Td>
                                                    </Tr>
                                                )
                                            )}
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

    try {
        const [glickoVars, periodVars] = await Promise.all([
            getCurrentSettings(),
            getAllRatingPeriods()
        ])
        
        return {
            props: {
                glicko: {
                    Rating: glickoVars?.defaultRating,
                    Volatility: glickoVars?.defaultVolatility,
                    RatingDeviation: glickoVars?.defaultRatingDeviation,
                    SystemConstant: glickoVars?.systemConstant
                },
                periods: periodVars.map((p) => {
                    return { 
                         Name: p.ratingPeriod.name,
                         Start: getDate(p.ratingPeriod.startDate),
                         End: getDate(p.ratingPeriod.endDate)
                     }
                 })
            }
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

function getDate(d: Date): string {
    return moment(d).format('YYYY-MM-DD') as string
}

export default GlickoInformation