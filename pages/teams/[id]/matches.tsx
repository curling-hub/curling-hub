import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { Session } from 'next-auth'
import TeamLayout from '../../../components/layouts/TeamLayout'
import {
    Box, useMediaQuery
} from '@chakra-ui/react'
import TeamRatingsBox from '../../../components/teamRatings/teamRatingsBox'
import TeamRatingsBoxSmall from '../../../components/teamRatings/teamRatingsBoxSmall'
import TeamRatingsBoxMobile from '../../../components/teamRatings/teamRatingsBoxMobile'
import { getTeamInfoByUserId, getTeamMatches } from '../../../lib/handlers/teams'
import type { TeamMatch } from '../../../lib/models/teams'
import { useEffect, useState } from 'react'
import { Filter } from '../../../lib/models/match'
import Footer from '../../../components/footer/footer'
import { getSession, getSessionServerSideResult } from '../../../lib/auth/session'
import { serverSideRedirectTo } from '../../../lib/auth/redirect'

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
    matches: TeamMatch[],
    teamId: number,
}

const TeamRatings: NextPage<TeamRatingsProps> = (props: TeamRatingsProps) => {
    const { teamId } = props
    const [ isSmallScreen ] = useMediaQuery("(max-width: 880px)")
    const [ isMobileScreen ] = useMediaQuery("(max-width: 510px)")
    const [ mounted, setMounted ] = useState(false)
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
                    mounted && isMobileScreen && isSmallScreen &&
                        <TeamLayout>
                            <TeamRatingsBoxMobile
                                teamMatches={props.matches}
                                filters={filters}
                                tableSize={8}
                                teamId={teamId}
                            />
                        </TeamLayout>
                }
                {
                    mounted && !isMobileScreen && isSmallScreen &&
                        <TeamLayout>
                            <TeamRatingsBoxSmall
                                teamMatches={props.matches}
                                filters={filters}
                                tableSize={8}
                                teamId={teamId}
                            />
                        </TeamLayout>
                }
                {
                    mounted && !isMobileScreen && !isSmallScreen &&
                        <TeamLayout>
                            <TeamRatingsBox
                                teamMatches={props.matches}
                                filters={filters}
                                tableSize={10}
                                teamId={teamId}
                            />
                        </TeamLayout>
                }
            <Footer/>
            </Box>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const sessionWrapper = await getSession(context)
    const { signedIn, signedUp, session } = sessionWrapper

    if (!signedIn || !signedUp || !session) {
        return serverSideRedirectTo('/')
    }
    
    const { params } = context
    if (!params) {
        return { notFound: true }
    }
    const idStr = Array.isArray(params.id) ? params.id[0] : params.id
    if (!idStr) {
        return { notFound: true }
    }
    const teamId = Number.parseInt(idStr)
    const userId = session.user.id
   
    

    const matches = await getTeamInfoByUserId(userId)
    console.log(matches)
    /*return {
        props: {
            user: session,
            rankings: null,
            userId,
        },
    }*/
}

export default TeamRatings
