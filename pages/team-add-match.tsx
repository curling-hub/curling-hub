import type { NextPage } from 'next'
import Head from 'next/head'
import { Box, Divider } from '@chakra-ui/react'

import TeamLayout from '../components/layouts/TeamLayout'
import AddMatch from '../components/profile/addMatch'
import AddMatchFields from '../components/profile/addMatch/fields'
import AddMatchTitle from '../components/profile/addMatch/title'

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
                <TeamLayout>
                    <AddMatch>
                        <AddMatchTitle />
                        <AddMatchFields />
                    </AddMatch>
                </TeamLayout>
            </Box>
        </>
    )
}

export default TeamAddMatch