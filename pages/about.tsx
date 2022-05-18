import { Box, Grid, Image, Heading, Text, Flex, Container } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { CONST_BORDER_RADIUS } from "../themes/constants";
import TeamLayout from '../components/layouts/TeamLayout'
import StandardLayout from '../components/layouts/StandardLayout';
import Footer from '../components/footer/footer';
import { useSession } from 'next-auth/react'
import { getSession } from '../lib/auth/session'
import type { GetServerSideProps } from 'next'
import { getAllTeams } from '../lib/handlers/teams';
import { getHostInfoById, isHostAdmin } from '../lib/handlers/hosts';
import { AccountType } from '../lib/models/accountType';
import { serverSideRedirectTo } from '../lib/auth/redirect';
import HostLayout from '../components/layouts/HostLayout';
import AdminLayout from '../components/layouts/AdminLayout';

export interface loggedInProps {
    isLoggedIn: boolean
    accountType: string
    id: number
}

function getNavType(id: number, accountType: string) {
    if (accountType == 'host') {
        return <HostLayout hostId={id} />
    }
    else if (accountType == 'admin') {
        return <AdminLayout />
    }
    else if (accountType == 'team') {
        return <TeamLayout />
    }
}

const About: NextPage<loggedInProps> = (props: loggedInProps) => {
    const { data: session } = useSession()
    return (
        <>
            <Head>
                <title>About | Curlo</title>
            </Head>
            <Box
                position="relative"
                w="100%"
                minH="100vh"
                bgGradient="linear-gradient(primary.purple, primary.white)"
            >
                {session ? getNavType(props.id, props.accountType) : <StandardLayout />}
                <Box
                    paddingBottom="4rem"
                >
                    <Box w="90%" bg="primary.white" borderRadius={CONST_BORDER_RADIUS} boxShadow="lg" py="4" m="5%">
                        <Grid w="90%" bg="primary.green" borderRadius={CONST_BORDER_RADIUS} m="5%" py="1px" templateColumns="repeat(5, 1fr)" >
                            {/* TODO: Add new logo */}
                            <Image src="/curloLogo2.svg" alt="Curlo logo" w="100px" h="100px" m="auto" gridColumn={{ base: "1 / 6", md: "1" }} />
                            <Box gridColumn={{ base: "1 / 6", md: "2 / 5" }}>
                                <Heading fontWeight="bold" textAlign="center" m="2.5%">
                                    Who we are
                                </Heading>
                                <Text fontSize="medium" textAlign="center" m="2.5%">
                                    Curlo is a not for profit website that seeks to provide tools for curlers to get
                                    connected and compete. Curlo uses a state of the art rating algorithm to rate teams
                                    across the world. This enables curlers from around the world to compete with oneanother.
                                    All the money made from membership fees is put back into the website and the extra is
                                    given out to the hosting locations around the world.
                                </Text>
                            </Box>
                        </Grid>
                        <Grid w="90%" bg="primary.green" borderRadius={CONST_BORDER_RADIUS} m="5%" py="1px" templateColumns="repeat(5, 1fr)" >
                            <Box my="auto" gridColumn={{ base: "1 / 6", md: "1" }}>
                                <Heading fontWeight="bold" textAlign="center" m="2.5%">
                                    $50
                                </Heading>
                                <Text fontSize="medium" textAlign="center" m="2.5%">
                                    Per Year
                                </Text>
                            </Box>
                            <Box gridColumn={{ base: "1 / 6", md: "2 / 5" }}>
                                <Heading fontWeight="bold" textAlign="center" m="2.5%">
                                    Membership
                                </Heading>
                                <Text fontSize="medium" textAlign="center" m="2.5%">
                                    In order to signup and join Curlo, you must pay an annual fee. This is a flat rate fee
                                    that allows you to join as many teams as you desire. This fee will be charged yearly in
                                    July. If you own a curling company and want to signup as a host, there is no fee.
                                </Text>
                            </Box>
                        </Grid>
                        <Grid w="90%" bg="primary.green" borderRadius={CONST_BORDER_RADIUS} m="5%" py="1px" templateColumns="repeat(5, 1fr)" >
                            <Box gridColumn={{ base: "1 / 6", md: "2 / 5" }}>
                                <Heading fontWeight="bold" textAlign="center" m="2.5%">
                                    Rating System
                                </Heading>
                                <Text fontSize="medium" textAlign="center" m="2.5%">
                                    Curlo uses a professional rating system called Glicko. Designed by Mark Glickman,
                                    Glicko uses game scores to rate the strength of players and teams. It uses a simple
                                    formula to give a score to a team or individual. This rating system is used in popular
                                    games such as chess, pokémon, and more. Glicko is used by Curlo to rate teams. This
                                    allows us to compare teams in order to present a worldwide leaderboard.
                                </Text>
                            </Box>
                        </Grid>
                        <Box w="90%" bg="primary.green" borderRadius={CONST_BORDER_RADIUS} m="5%" py="1px">
                            <Box w="60%" mx="auto">
                                <Heading fontWeight="bold" textAlign="center" m="2.5%">
                                    Categories
                                </Heading>
                            </Box>
                            <Flex flexFlow="row wrap" justifyContent="center">
                                {/* TODO: Link to future pages */}
                                <Heading fontWeight="bold" m="2.5%">
                                    Open
                                </Heading>
                                <Heading fontWeight="bold" m="2.5%">
                                    Mixed
                                </Heading>
                                <Heading fontWeight="bold" m="2.5%">
                                    Women
                                </Heading>
                                <Heading fontWeight="bold" m="2.5%">
                                    Men
                                </Heading>
                                <Heading fontWeight="bold" m="2.5%">
                                    U18
                                </Heading>
                                <Heading fontWeight="bold" m="2.5%">
                                    U5
                                </Heading>
                                <Heading fontWeight="bold" m="2.5%">
                                    Junior
                                </Heading>
                                <Heading fontWeight="bold" m="2.5%">
                                    Senior
                                </Heading>
                            </Flex>
                        </Box>
                    </Box>
                </Box>
                <Footer />
            </Box>
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
    const { signedIn, signedUp, session } = await getSession(context)
    if (!session) {
        return serverSideRedirectTo('/login')
    }
    //const accountType: string = session.user.account_type as string

    if (!signedIn) {// not signed in 
        return {
            props: { isLoggedIn: false, session: null, accountType: null }
        }
    }
    else {
        const { params } = context
        if (!params) {
            return { notFound: true }
        }
        const idStr = Array.isArray(params.id) ? params.id[0] : params.id
        if (!idStr) {
            return { notFound: true }
        }
        const hostId = Number.parseInt(idStr)
        const userId = session.user.id
        // TODO: redirect on error?
        try {
            const [teams, hostInfo, hasPermission] = await Promise.all([
                getAllTeams(),
                getHostInfoById(hostId),
                isHostAdmin(userId, hostId),
            ])
            if (!hasPermission) {
                return { notFound: true }
            }
            //console.log({ teams, hostInfo })

            if (session.user.account_type == AccountType.ADMIN) {
                return {
                    props: { isLoggedIn: true, session: session, accountType: 'admin' }
                }
            }

            else if (session.user.account_type == AccountType.TEAM) {
                return {
                    props: { isLoggedIn: true, session: session, accountType: 'team' }
                }
            }

            else if (session.user.account_type == AccountType.HOST) {
                return {
                    props: { isLoggedIn: true, session: session, accountType: 'host', id: hostId }
                }
            }

        } catch (error) {
            console.log(error)
        }
        return { props: {} }
    }
}
export default About;
