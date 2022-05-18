import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import HostLayout from '../../../components/layouts/HostLayout'
import Footer from "../../../components/footer/footer";
import {
    Box,
    useMediaQuery
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { convertAndVerifyContextId, getSession, getSessionServerSideResult } from '../../../lib/auth/session'
import ProfileBox from '../../../components/host/profile/ProfileBox'
import type { CurrentHostInfo } from '../../../lib/models/host'
import type { HostMatchResult } from '../../../lib/models/match'
import { getHostEmailById, getHostInfoById, isHostAdmin } from '../../../lib/handlers/hosts';
import { getHostMatchesById } from '../../../lib/handlers/matches'
import { getTeamById } from '../../../lib/handlers/teams';
import { AccountType } from '../../../lib/models/accountType';
import { HostInfoModel } from '../../../lib/db_model';
import { hostPagesLoggedInRedirects, serverSideRedirectTo } from '../../../lib/auth/redirect';

interface HostProfileProps {
    currentHost: CurrentHostInfo
    hostMatches: HostMatchResult[]
    hostEmail: string
    hostId: number
}

const HostProfile: NextPage<HostProfileProps> = (props: HostProfileProps) => {
    const [isSmallScreen] = useMediaQuery("(max-width: 768px)")
    const [mounted, setMounted] = useState(false)
    useEffect(() => { setMounted(true) }, [])

    const {
        currentHost,
        hostMatches = [],
        hostEmail,
        hostId,
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
                <HostLayout hostId={hostId}>
                    <ProfileBox currentHost={currentHost} hostMatches={hostMatches} hostEmail={hostEmail} hostId={hostId} />
                </HostLayout>
                <Footer />
            </Box >
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
    if (session.user.account_type !== AccountType.HOST) {
        return hostPagesLoggedInRedirects(userId, session.user.account_type)
    }
    const { params } = context
    const hostId = convertAndVerifyContextId(params)
    if (!hostId) {
        return { notFound: true }
    }
    const [hostEmail = undefined, hostInfo, hasPermission] = await Promise.all([
        getHostEmailById(hostId),
        getHostInfoById(hostId),
        isHostAdmin(userId, hostId),
    ])
    if (!hostInfo || !hasPermission) {
        return { notFound: true }
    }

    if (hostInfo?.status !== 'accepted') {
        return serverSideRedirectTo(`/hosts/${hostId}/request`)
    }

    const currentHost: CurrentHostInfo = {
        organization: hostInfo.organization,
        website: hostInfo.website,
        phoneNumber: hostInfo.phoneNumber,
        streetAddress: hostInfo.streetAddress,
        addressExtras: hostInfo.addressExtras,
        city: hostInfo.city,
        state: hostInfo.state,
        zip: hostInfo.zip,
        country: hostInfo.country,
        iceSheets: hostInfo.iceSheets,
    }
    const tempMatches = await getHostMatchesById(hostId)
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
            session: session,
            currentHost: currentHost,
            hostMatches: hostMatches,
            hostEmail: hostEmail,
            hostId: hostId,
        },
    }
}

export default HostProfile
