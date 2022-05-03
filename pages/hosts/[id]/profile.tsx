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
import { getHostInfoById } from '../../../lib/handlers/hosts';
import { getHostMatchesById } from '../../../lib/handlers/matches'
import { getTeamById } from '../../../lib/handlers/teams';

interface HostProfileProps {
    currentHost: CurrentHostInfo
    hostMatches: HostMatchResult[]
}

const HostProfile: NextPage<HostProfileProps> = (props: HostProfileProps) => {
    const [isSmallScreen] = useMediaQuery("(max-width: 768px)")
    const [mounted, setMounted] = useState(false)
    useEffect(() => { setMounted(true) }, [])

    const {
        currentHost,
        hostMatches = [],
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
                    <ProfileBox currentHost={currentHost} hostMatches={hostMatches} />
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
    const id = context.params?.id ? context.params.id : 1
    const sessionWrapper = await getSession(context)
    const { signedIn, signedUp, session } = sessionWrapper
    const tempHost = await getHostInfoById(id.toString())
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
    const tempMatches = await getHostMatchesById(id.toString())
    // Format hosts for page and serialization
    const hostMatches = await Promise.all(tempMatches.map(async (match) => {
        const convert: HostMatchResult = {
            team1: (await getTeamById(match.teamId1))?.name || match.teamId1.toString(),
            team2: (await getTeamById(match.teamId2))?.name || match.teamId2.toString(),
            date: match.date.getMonth().toString() + "/" +
                match.date.getDate().toString() + "/" +
                match.date.getFullYear().toString(),
        }
        return convert
    }))
    if (!session || !session["user"]) {
        // not signed in / signed up
        return {
            props: {
                user: null,
                // TODO: Remove props when not signed in
                currentHost: currentHost,
                hostMatches: hostMatches,
            }
        }
    }

    const user = session["user"]
    if (!user["account_type"]) {
        // has not completed sign up up
        return {
            props: {
                user: null,
                // TODO: Remove props when not signed in
                currentHost: currentHost,
                hostMatches: hostMatches,
            },
        }
    }

    // signed in, share session with component
    return {
        props: {
            user: session,
            currentHost: currentHost,
            hostMatches: hostMatches,
        },
    }
}

export default HostProfile

