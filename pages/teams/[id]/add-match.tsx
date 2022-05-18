import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Box, Center, Text } from '@chakra-ui/react'

import TeamLayout from '../../../components/layouts/TeamLayout'
import AddMatch from '../../../components/profile/addMatch'
import AddMatchFields from '../../../components/profile/addMatch/fields'
import AddMatchTitle from '../../../components/profile/addMatch/title'
import type { HostInfo, TeamInfo } from '../../../lib/models'
import { getAllHosts } from '../../../lib/handlers/hosts'
import { getAllTeams, getTeamById, isTeamAdmin } from '../../../lib/handlers/teams'
import { convertAndVerifyContextId, getSession, getSessionServerSideResult } from '../../../lib/auth/session'
import { teamPagesLoggedInRedirects } from '../../../lib/auth/redirect'
import { AccountType } from '../../../lib/models/accountType'


interface TeamAddMatchProps {
    hosts?: HostInfo[]
    teams?: TeamInfo[]
    currentTeam: TeamInfo
    teamId?: number
}

const TeamAddMatch: NextPage<TeamAddMatchProps> = (props: TeamAddMatchProps) => {
    const router = useRouter()
    const {
        currentTeam,
        hosts = [],
        teams = [],
        teamId,
    } = props
    const [submissionError, setSubmissionError] = useState('')
    const formOnSubmit = async (values: any) => {
        console.log(values)
        const res = await fetch('/api/team/match/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: (new URLSearchParams(values)).toString(),
        })
        if (res.status !== 200) {
            const { error } = await res.json()
            setSubmissionError(error)
            return
        }
        router.push(`/teams/${teamId}/profile`)
    }
    const fetchIceSheetsByHostId = async (hostId: number): Promise<any[]> => {
        const res = await fetch(`/api/location/${hostId}/info`)
        if (res.status === 200) {
            const hostInfo = await res.json()
            return hostInfo.data.iceSheets || []
        }
        return []
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
                <TeamLayout teamId={teamId}>
                    <AddMatch>
                        <AddMatchTitle />
                        <AddMatchFields
                            hosts={hosts}
                            teams={teams}
                            currentTeam={currentTeam}
                            onSubmit={formOnSubmit}
                            fetchIceSheetsByHostId={fetchIceSheetsByHostId}
                        />
                        {submissionError !== '' && (
                            <Center>
                                <Text textColor="red.500">{submissionError}</Text>
                            </Center>
                        )}
                    </AddMatch>
                </TeamLayout>
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
    // TODO: redirect on error?
    try {
        const [hosts, teams, teamInfo, hasPermission] = await Promise.all([
            getAllHosts(),
            getAllTeams(),
            getTeamById(teamId),
            isTeamAdmin(userId, teamId),
        ])
        if (!teamInfo || !hasPermission) {
            return { notFound: true }
        }
        return {
            props: {
                hosts,
                teams,
                currentTeam: teamInfo,
                teamId,
            },
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

export default TeamAddMatch
