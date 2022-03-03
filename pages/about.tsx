import { Box, Grid, Image, Heading, Text, Flex } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import StandardLayout from '../components/layouts/StandardLayout'

const About: NextPage = () => {
    return (
        <>
            <Head>
                <title>About | Curlo</title>
            </Head>
            <div style={{
                background: "linear-gradient(#735FED, #FFFFFF)",
                height: "100vh",
                width: '100%'
            }}>
                <StandardLayout />
                <Box w="90%" bg="#FFFFFF" borderRadius="20px" mx="auto" py="1px">
                    <Grid w="90%" bg="#7FD6A4" borderRadius="20px" m="5%" py="1px" templateColumns="repeat(5, 1fr)" >
                        <Image src="/curloLogo2.svg" alt="Curlo logo" w="100px" h="100px" m="auto" />
                        <Box gridColumn="2 / 5">
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
                    <Grid w="90%" bg="#7FD6A4" borderRadius="20px" m="5%" py="1px" templateColumns="repeat(5, 1fr)" >
                        <Box gridColumn="2 / 5">
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
                    <Grid w="90%" bg="#7FD6A4" borderRadius="20px" m="5%" py="1px" templateColumns="repeat(5, 1fr)" >
                        <Box gridColumn="2 / 5">
                            <Heading fontWeight="bold" textAlign="center" m="2.5%">
                                Rating System
                            </Heading>
                            <Text fontSize="medium" textAlign="center" m="2.5%">
                                Curlo uses a professional rating system called Glicko. Designed by Mark Glickman,
                                Glicko uses game scores to rate the strength of players and teams. It uses a simple
                                formula to give a score to a team or individual. This rating system is used in popular
                                games such as chess, pokeman, and more. Glicko is used by Curlo to rate teams. This
                                allows us to compare teams in order to present a worldwide leaderboard.
                            </Text>
                        </Box>
                    </Grid>
                    <Box w="90%" bg="#7FD6A4" borderRadius="20px" m="5%" py="1px">
                        <Box w="60%" mx="auto">
                            <Heading fontWeight="bold" textAlign="center" m="2.5%">
                                Categories
                            </Heading>
                        </Box>
                        <Flex flexFlow="row wrap">
                            <Heading fontWeight="bold" textAlign="center" m="2.5%">
                                Open
                            </Heading>
                            <Heading fontWeight="bold" textAlign="center" m="2.5%">
                                Mixed
                            </Heading>
                            <Heading fontWeight="bold" textAlign="center" m="2.5%">
                                Women
                            </Heading>
                            <Heading fontWeight="bold" textAlign="center" m="2.5%">
                                Men
                            </Heading>
                            <Heading fontWeight="bold" textAlign="center" m="2.5%">
                                U18
                            </Heading>
                            <Heading fontWeight="bold" textAlign="center" m="2.5%">
                                U5
                            </Heading>
                            <Heading fontWeight="bold" textAlign="center" m="2.5%">
                                Junior
                            </Heading>
                            <Heading fontWeight="bold" textAlign="center" m="2.5%">
                                Senior
                            </Heading>
                        </Flex>
                    </Box>
                </Box>
            </div>
        </>
    )
}

export default About