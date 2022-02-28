import { Box, Heading, Text } from '@chakra-ui/react'
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
                <Box width="90%" background="white" borderRadius="20" mx="auto" py="5%">
                    <Box width="90%" background="#7FD6A4" borderRadius="20" mx="auto" py="2%">
                        <Box width="60%" mx="auto" >
                            <Heading fontWeight="bold" textAlign="center">
                                Who we are
                            </Heading>
                            <Text fontSize="medium" textAlign="center">
                                Curlo is a not for profit website that seeks to provide tools for curlers to get connected and
                                compete. Curlo uses a state of the art rating algorithm to rate teams across the world. This
                                enables curlers from around the world to compete with oneanother. All the money made from
                                membership fees is put back into the website and the extra is given out to the hosting
                                locations around the world.
                            </Text>
                        </Box>
                    </Box>
                </Box>
            </div>
        </>
    )
}

export default About