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
import { getTeamMatches, isUserOnTeam } from '../../../lib/handlers/teams'
import type { TeamMatch } from '../../../lib/models/teams'
import { useEffect, useState } from 'react'
import { Filter } from '../../../lib/models/match'
import Footer from '../../../components/footer/footer'
import { getSession } from '../../../lib/auth/session'
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

function useWindowDimensions() {

    const hasWindow = typeof window !== 'undefined';

    function getWindowDimensions() {
        const width = hasWindow ? window.innerWidth : null;
        const height = hasWindow ? window.innerHeight : null;
        return {
            width,
            height,
        };
    }

    function handleResize() {
        setWindowDimensions(getWindowDimensions());
    }

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        if (hasWindow) {
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [hasWindow, handleResize]);

    return windowDimensions;
}

const TeamRatings: NextPage<TeamRatingsProps> = (props: TeamRatingsProps) => {
    const { teamId } = props
    const {height, width} = useWindowDimensions()
    const [ isSmallScreen ] = useMediaQuery("(max-width: 880px)")
    const [ isMobileScreen ] = useMediaQuery("(max-width: 510px)")
    const [ mounted, setMounted ] = useState(false)
    useEffect(() => { setMounted(true) }, [])
    const pageNum = height ? (Math.floor(((height) * 0.7 * 0.8) / 33) - 2) : 10

    return (
        <>
            <Head>
                <title>Matches | curlo</title>
            </Head>
            <Box
               position="absolute"
               w="100%"
               minH="100%"
               bgGradient="linear-gradient(primary.purple, primary.white)"
            >
                <Box 
                    paddingBottom="4rem"
                >
                {
                    mounted && isMobileScreen && isSmallScreen &&
                        <TeamLayout>
                            <TeamRatingsBoxMobile
                                teamMatches={props.matches}
                                filters={filters}
                                tableSize={pageNum}
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
                                tableSize={pageNum}
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
                                tableSize={pageNum}
                                teamId={teamId}
                            />
                        </TeamLayout>
                }
                </Box>
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

    const allowed = await isUserOnTeam(teamId, userId)
    
    if (allowed) {
        const matches = await getTeamMatches(teamId)
        return {
            props: {
                user: session,
                matches: matches,
                userId,
            },
        }
    }

    else {
        return serverSideRedirectTo('/')
    }
}

export default TeamRatings
