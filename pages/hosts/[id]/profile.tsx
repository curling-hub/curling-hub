import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import HostLayout from '../../../components/layouts/HostLayout'
import Footer from "../../../components/footer/footer";
import {
    Box,
    useMediaQuery
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { getSession, getSessionServerSideResult } from '../../../lib/auth/session'
import ProfileBox from '../../../components/host/profile/ProfileBox'
import type { CurrentHostInfo } from '../../../lib/models/host'
import type { HostMatchResult } from '../../../lib/models/match'
import { getHostEmailById, getHostInfoById } from '../../../lib/handlers/hosts';
import { getHostMatchesById } from '../../../lib/handlers/matches'
import { getTeamById } from '../../../lib/handlers/teams';
import { AccountType } from '../../../lib/models/accountType';
import { serverSideRedirectTo } from '../../../lib/auth/redirect';

interface HostProfileProps {
    currentHost: CurrentHostInfo
    hostMatches: HostMatchResult[]
    hostEmail: string
}

const HostProfile: NextPage<HostProfileProps> = (props: HostProfileProps) => {
    const [isSmallScreen] = useMediaQuery("(max-width: 768px)")
    const [mounted, setMounted] = useState(false)
    useEffect(() => { setMounted(true) }, [])

    const {
        currentHost,
        hostMatches = [],
        hostEmail,
    } = props

    return (
        <>
            <Head>
                <title>Host Profile | Curlo</title>
            </Head>
            <Box
                position="relative"
                w="100%"
                minH="100vh"
                bgGradient="linear-gradient(primary.purple, primary.white)"
            >
                <HostLayout>
                    <ProfileBox currentHost={currentHost} hostMatches={hostMatches} hostEmail={hostEmail} />
                </HostLayout>
                <Footer />
            </Box >
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const contextId = context.params?.id ? context.params.id.toString() : "1"
    const sessionWrapper = await getSession(context)
    const { signedIn, signedUp, session } = sessionWrapper
    if (!signedIn || !signedUp || !session) {
        return getSessionServerSideResult(sessionWrapper)
    }
    switch (session.user.account_type) {
        case AccountType.TEAM:
            return serverSideRedirectTo(`/team-profile`) //BENNETTTODO
        case AccountType.ADMIN:
            return serverSideRedirectTo(`/admin-requests`)
    }
    const sessionId = session.user.id //CH104 TODO
    if (sessionId !== contextId) {
        return serverSideRedirectTo(`/hosts/${sessionId}/profile`)
    }
    const hostEmail = await getHostEmailById(contextId) || undefined
    const tempHost = await getHostInfoById(contextId)
    if (!tempHost) {
        return {
            props: {}
        }
    }
    const currentHost: CurrentHostInfo = {
        organization: tempHost.organization,
        website: tempHost.website,
        phoneNumber: tempHost.phoneNumber,
        streetAddress: tempHost.streetAddress,
        addressExtras: tempHost.addressExtras,
        city: tempHost.city,
        state: tempHost.state,
        zip: tempHost.zip,
        country: tempHost.country,
        iceSheets: tempHost.iceSheets,
    }
    const tempMatches = await getHostMatchesById(contextId)
    // Format hosts for page and serialization
    const hostMatches = await Promise.all(tempMatches.map(async (match) => {
        const convert: HostMatchResult = {
            matchId: match.matchId,
            team1: (await getTeamById(match.teamId1))?.name || match.teamId1.toString(),
            team2: (await getTeamById(match.teamId2))?.name || match.teamId2.toString(),
            date: match.date.getMonth().toString() + "/" +
                match.date.getDate().toString() + "/" +
                match.date.getFullYear().toString(),
        }
        return convert
    }))
    // signed in, share session with component
    return {
        props: {
            user: session,
            currentHost: currentHost,
            hostMatches: hostMatches,
            hostEmail: hostEmail,
        },
    }
}

export default HostProfile

