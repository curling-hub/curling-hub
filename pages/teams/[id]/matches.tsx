import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { getSession } from 'next-auth/react'
import { Session } from 'next-auth'
import TeamLayout from '../../../components/layouts/TeamLayout'
import {
    Box, useMediaQuery
} from '@chakra-ui/react'
import TeamRatingsBox from '../../../components/teamRatings/teamRatingsBox'
import TeamRatingsBoxSmall from '../../../components/teamRatings/teamRatingsBoxSmall'
import { populateTeamMatchesPage } from '../../../lib/handlers/teams'
import { TeamMatch } from '../../../lib/models/teams'
import { useEffect, useState } from 'react'
import { Filter } from '../../../lib/models/match'
import { useRouter } from 'next/router'

const filters = [
    {filter_id: 1, value: "Most Recent"},
    {filter_id: 2, value: "Oldest"},
    {filter_id: 3, value: "Wins"},
    {filter_id: 4, value: "Losses"},
    {filter_id: 5, value: "Ties"}
]

interface TeamRatingsProps {
    user?: Session,
    filters: Filter[],
    matches: TeamMatch[]
}

const TeamRatings: NextPage<TeamRatingsProps> = (props: TeamRatingsProps) => {
    const [isSmallScreen] = useMediaQuery("(max-width: 768px)")
    const [mounted, setMounted] = useState(false)
    useEffect(() => { setMounted(true) }, [])
    
    return (
        <>
            <Head>
                <title>Matches | curlo</title>
            </Head>
            <Box
                position="absolute"
                w="100%"
                h="100vh"
                bgGradient="linear-gradient(primary.purple, primary.white)"
            >
                {
                    mounted && !isSmallScreen &&
                        <TeamLayout>
                            <TeamRatingsBox
                                teamMatches={props.matches}
                                filters={filters}
                                tableSize={10}
                            />
                        </TeamLayout>
                }
                {
                    mounted && isSmallScreen &&
                        <TeamLayout>
                            <TeamRatingsBoxSmall
                                teamMatches={props.matches}
                                filters={filters}
                                tableSize={8}
                            />
                        </TeamLayout>
                }
            </Box>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.params?.id ? context.params.id : 1
    const session = await getSession(context)
    const matches = await populateTeamMatchesPage(id.toString())
    
    if (!session || !session["user"]) {
        // not signed in / signed up
        return {
            props: {
                user: null,
                matches: matches
            }
        }
    }

    const user = session["user"]
    if (!user["account_type"]) {
        // has not completed sign up up
        return {
            props: {
                user: null,
                matches: matches
            },
        }
    }

    // signed in, share session with component
    return {
        props: {
            user: session,
            rankings: null
        },
    }
}

export default TeamRatings