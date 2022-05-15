import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Box, Center, Text } from '@chakra-ui/react'

import HostLayout from '../../../components/layouts/HostLayout'
import AddMatch from '../../../components/host/addMatch'
import AddMatchFields from '../../../components/host/addMatch/fields'
import AddMatchTitle from '../../../components/host/addMatch/title'
import type { HostInfo, TeamInfo } from '../../../lib/models'
import { getHostInfoById, isHostAdmin } from '../../../lib/handlers/hosts'
import { getAllTeams } from '../../../lib/handlers/teams'
import { getSession, getSessionServerSideResult } from '../../../lib/auth/session'
import { AccountType } from '../../../lib/models/accountType'
import { serverSideRedirectTo } from '../../../lib/auth/redirect'


interface HostAddMatchProps {
    hostInfo?: HostInfo
    hostId: number
    teams?: TeamInfo[]
}

const HostAddMatchPage: NextPage<HostAddMatchProps> = (props): JSX.Element => {
    const router = useRouter()
    const {
        hostInfo,
        hostId,
        teams = [],
    } = props
    const [ submissionError, setSubmissionError ] = useState('')
    const formOnSubmit = async (values: any) => {
        console.log(values)
        const res = await fetch('/api/host/match/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: (new URLSearchParams(values)).toString(),
        })
        if (res.status !== 200) {
            const { error } = await res.json()
            setSubmissionError(error)
            return
        }
        router.push(`/hosts/${hostId}/profile`)
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
                <HostLayout hostId={hostId}>
                    <AddMatch>
                        <AddMatchTitle />
                        <AddMatchFields
                            host={hostInfo}
                            teams={teams}
                            onSubmit={formOnSubmit}
                        />
                        {submissionError !== '' && (
                            <Center>
                                <Text textColor="red.500">{submissionError}</Text>
                            </Center>
                        )}
                    </AddMatch>
                </HostLayout>
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
    switch (session.user.account_type) {
        case AccountType.TEAM:
            return serverSideRedirectTo('/team-profile')
    }
    const { params } = context
    if (!params) {
        return { notFound: true }
    }
    const idStr = Array.isArray(params.id) ? params.id[0] : params.id
    if (!idStr) {
        return { notFound: true }
    }
    const hostId = Number.parseInt(idStr)
    const userId = session.user.id
    // TODO: redirect on error?
    try {
        const [ teams, hostInfo, hasPermission ] = await Promise.all([
            getAllTeams(),
            getHostInfoById(hostId),
            isHostAdmin(userId, hostId),
        ])
        if (!hasPermission) {
            return { notFound: true }
        }
        //console.log({ teams, hostInfo })
        return {
            props: {
                teams,
                hostInfo,
                hostId,
            },
        }
    } catch (error) {
        console.log(error)
    }
    return { props: {} }
}


export default HostAddMatchPage
