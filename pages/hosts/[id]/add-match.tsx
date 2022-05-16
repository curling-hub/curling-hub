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
import { getHostInfoById } from '../../../lib/handlers/hosts'
import { getAllTeams } from '../../../lib/handlers/teams'
import { getSession, getSessionServerSideResult } from '../../../lib/auth/session'
import { AccountType } from '../../../lib/models/accountType'
import { serverSideRedirectTo } from '../../../lib/auth/redirect'


interface HostAddMatchProps {
    hostInfo?: HostInfo
    teams?: TeamInfo[]
}

const HostAddMatchPage: NextPage<HostAddMatchProps> = (props): JSX.Element => {
    const router = useRouter()
    const {
        hostInfo,
        teams = [],
    } = props
    const [submissionError, setSubmissionError] = useState('')
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
        router.push('/hosts/profile')
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
                <HostLayout>
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
    const id = context.params?.id ? context.params.id.toString() : "1"
    const sessionWrapper = await getSession(context)
    const { signedIn, signedUp, session } = sessionWrapper
    if (!signedIn || !signedUp || !session) {
        return getSessionServerSideResult(sessionWrapper)
    }
    switch (session.user.account_type) {
        case AccountType.TEAM:
            return serverSideRedirectTo('/team-profile')
    }
    // TODO: redirect on error?
    try {
        const [teams, hostInfo] = await Promise.all([
            getAllTeams(),
            getHostInfoById(id),
        ])
        //console.log({ teams, hostInfo })
        return {
            props: {
                teams,
                hostInfo,
            },
        }
    } catch (error) {
        console.log(error)
    }
    return { props: {} }
}


export default HostAddMatchPage