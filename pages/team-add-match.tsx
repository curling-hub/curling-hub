import type { NextPage } from 'next'
import Head from 'next/head'
import TeamLayout from '../components/layouts/TeamLayout'
import { Box } from '@chakra-ui/react'

const TeamAddMatch: NextPage = () => {
    return (
        <>
            <Head>
                <title>Add Match | Curlo</title>
            </Head>
            <Box
                position="absolute"
                w="100%"
                h="100vh"
                bgGradient="linear-gradient(primary.purple, primary.white)"
            >
                <TeamLayout />
            </Box>
        </>
    )
}

export default TeamAddMatch