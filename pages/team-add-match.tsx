import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import { Box, Divider } from '@chakra-ui/react'

import TeamLayout from '../components/layouts/TeamLayout'
import AddMatch from '../components/profile/addMatch'
import AddMatchFields from '../components/profile/addMatch/fields'
import AddMatchTitle from '../components/profile/addMatch/title'
import { getAllCategories } from '../lib/handlers/categories'
import type { Category, HostInfo, TeamInfo } from '../lib/models'
import { getAllHosts } from '../lib/handlers/hosts'
import { getAllTeams } from '../lib/handlers/teams'


interface TeamAddMatchProps {
    categories?: Category[]
    hosts?: HostInfo[]
    teams?: TeamInfo[]
}

const TeamAddMatch: NextPage<TeamAddMatchProps> = (props: TeamAddMatchProps) => {
    const {
        categories = [],
        hosts = [],
        teams = [],
    } = props
    const formOnSubmit = async (values: any) => {
        await fetch('/api/match/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: (new URLSearchParams(values)).toString(),
        })
    }

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
                        <AddMatchFields
                            hosts={hosts}
                            teams={teams}
                            categories={categories}
                            onSubmit={formOnSubmit}
                        />
                    </AddMatch>
                </TeamLayout>
            </Box>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    // Obtain team id and get team categories
    try {
        const [ categories, hosts, teams ] = await Promise.all([
            getAllCategories(),
            getAllHosts(),
            getAllTeams(),
        ])
        //console.log({ categories, hosts })
        return {
            props: {
                categories,
                hosts,
                teams,
            },
        }
    } catch (error) {
        console.log(error)
    }
    return {
        props: {},
    }
}

export default TeamAddMatch
