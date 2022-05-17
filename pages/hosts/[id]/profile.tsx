import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import HostLayout from '../../../components/layouts/HostLayout'
import Footer from "../../../components/footer/footer";
import {
    Box,
    useMediaQuery
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { getSession } from '../../../lib/auth/session'
import ProfileBox from '../../../components/host/profile/ProfileBox'
import type { CurrentHostInfo } from '../../../lib/models/host'
import type { HostMatchResult } from '../../../lib/models/match'
import { getHostEmailById, getHostInfoById, isHostAdmin } from '../../../lib/handlers/hosts';
import { getHostMatchesById } from '../../../lib/handlers/matches'
import { getTeamById } from '../../../lib/handlers/teams';
import { HostInfoModel } from '../../../lib/db_model';
import { serverSideRedirectTo } from '../../../lib/auth/redirect';

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
                    <ProfileBox currentHost={currentHost} hostMatches={hostMatches} hostEmail={hostEmail} />
                </HostLayout>
                <Footer />
            </Box >
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    // Redirect if not authentiated
    if (!context.params) {
        return {
            props: {}
        }
    }
    const { params } = context
    const id = (Array.isArray(params.id) ? params.id[0] : params.id) || ''
    const hostId = Number.parseInt(id)
    const sessionWrapper = await getSession(context)
    const { signedIn, signedUp, session } = sessionWrapper
    if (!signedIn || !session) {
        return serverSideRedirectTo('/login')
    }
    if (!signedUp) {
        return serverSideRedirectTo('/new-host')
    }
    const userId = session.user.id
    const [hostEmail = null, tempHost, hasPermission] = await Promise.all([
        getHostEmailById(hostId),
        getHostInfoById(hostId),
        isHostAdmin(userId, hostId),
    ])
    if (!tempHost || !hasPermission) {
        return { notFound: true }
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
    const tempMatches = await getHostMatchesById(id)
    // Format hosts for page and serialization
    const hostMatches = await Promise.all(tempMatches.map(async (match) => {
        const convert: HostMatchResult = {
            matchId: match.matchId,
            team1: (await getTeamById(match.teamId1))?.name || match.teamId1.toString(),
            team2: (await getTeamById(match.teamId2))?.name || match.teamId2.toString(),
            winner: match.winner,
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
