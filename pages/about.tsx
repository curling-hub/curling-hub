import { Box, Image, Heading, Text } from '@chakra-ui/react'
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
                    <Box w="90%" bg="#7FD6A4" borderRadius="20px" m="5%" display="flex">
                        <Image src="/curloLogo2.svg" alt="Curlo logo" w="100px" h="100px" mx="2.5%" my="auto" />
                        <Box w="60%" mx="auto">
                            <Heading fontWeight="bold" textAlign="center" m="2.5%">
                                Who we are
                            </Heading>
                            <Text fontSize="medium" textAlign="center" m="2.5%">
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