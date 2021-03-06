import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { convertAndVerifyContextId, getSession } from '../../../lib/auth/session'
import { Session } from 'next-auth'
import TeamLayout from '../../../components/layouts/TeamLayout'
import {
    Box, useMediaQuery
} from '@chakra-ui/react'
import TeamRatingsBox from '../../../components/teamRatings/teamRatingsBox'
import TeamRatingsBoxSmall from '../../../components/teamRatings/teamRatingsBoxSmall'
import { getTeamMatches, isTeamAdmin } from '../../../lib/handlers/teams'
import { getSessionServerSideResult } from '../../../lib/auth/session'
import { AccountType } from '../../../lib/models/accountType'
import TeamRatingsBoxMobile from '../../../components/teamRatings/teamRatingsBoxMobile'
import type { TeamMatch } from '../../../lib/models/teams'
import { useEffect, useState } from 'react'
import { Filter } from '../../../lib/models/match'
import Footer from '../../../components/footer/footer'
import { serverSideRedirectTo, teamPagesLoggedInRedirects } from '../../../lib/auth/redirect'

const filters = [
    { filter_id: 1, value: "Most Recent" },
    { filter_id: 2, value: "Oldest" },
    { filter_id: 3, value: "Wins" },
    { filter_id: 4, value: "Losses" },
    { filter_id: 5, value: "Ties" }
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
    const { user, filters, matches, teamId } = props
    const { height, width } = useWindowDimensions()
    const isSmallScreen = width && width < 880 ? true : false
    const isMobileScreen = width && width < 680 ? true : false
    const [mounted, setMounted] = useState(false)
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
                        <TeamLayout teamId={teamId}>
                            <TeamRatingsBoxMobile
                                teamMatches={matches}
                                filters={filters}
                                tableSize={pageNum}
                                teamId={teamId}
                            />
                        </TeamLayout>
                    }
                    {
                        mounted && !isMobileScreen && isSmallScreen &&
                        <TeamLayout teamId={teamId}>
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
                        <TeamLayout teamId={teamId}>
                            <TeamRatingsBox
                                teamMatches={props.matches}
                                filters={filters}
                                tableSize={pageNum}
                                teamId={teamId}
                            />
                        </TeamLayout>
                    }
                </Box>
                <Footer />
            </Box>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const sessionWrapper = await getSession(context)
    const { signedIn, signedUp, session } = sessionWrapper
    if (!signedIn || !signedUp || !session) {
        return getSessionServerSideResult(sessionWrapper)
    }

    const userId = session.user.id
    if (session.user.account_type !== AccountType.TEAM) {
        return teamPagesLoggedInRedirects(userId, session.user.account_type)
    }

    const { params } = context
    const teamId = convertAndVerifyContextId(params)
    if (!teamId) {
        return { notFound: true }
    }

    try {
        const [matches, hasPermission] = await Promise.all([
            getTeamMatches(teamId),
            isTeamAdmin(userId, teamId),
        ])
        if (!hasPermission) {
            return { notFound: true }
        }
        return {
            props: {
                user: session,
                filters: filters,
                matches: matches,
                teamId: teamId,
            },
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

export default TeamRatings
