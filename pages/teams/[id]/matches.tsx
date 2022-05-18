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
import type { TeamMatch } from '../../../lib/models/teams'
import { useEffect, useState } from 'react'
import { Filter } from '../../../lib/models/match'
import { getSessionServerSideResult } from '../../../lib/auth/session'
import { serverSideRedirectTo, teamPagesLoggedInRedirects } from '../../../lib/auth/redirect'
import { AccountType } from '../../../lib/models/accountType'

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

const TeamRatings: NextPage<TeamRatingsProps> = (props: TeamRatingsProps) => {
    const { teamId } = props
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
                    <TeamLayout teamId={teamId}>
                        <TeamRatingsBox
                            teamMatches={props.matches}
                            filters={filters}
                            tableSize={10}
                            teamId={teamId}
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
                            teamId={teamId}
                        />
                    </TeamLayout>
                }
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
