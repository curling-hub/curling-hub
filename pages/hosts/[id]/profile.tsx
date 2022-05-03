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
import type { HostInfo } from '../../../lib/models/host'
import type { MatchResult } from '../../../lib/models/match'
import { getHostInfoById } from '../../../lib/handlers/hosts';
import { getHostMatchesById } from '../../../lib/handlers/matches'

interface HostProfileProps {
    currentHost: HostInfo
    currentMatches: MatchResult[]
}

const HostProfile: NextPage<HostProfileProps> = (props: HostProfileProps) => {
    const [isSmallScreen] = useMediaQuery("(max-width: 768px)")
    const [mounted, setMounted] = useState(false)
    useEffect(() => { setMounted(true) }, [])

    const {
        currentHost,
        currentMatches = [],
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
                    <ProfileBox currentHost={currentHost} currentMatches={currentMatches} />
                </HostLayout>
                <Footer />
            </Box >
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    // Redirect if not authentiated
    const id = context.params?.id ? context.params.id : 1
    const sessionWrapper = await getSession(context)
    const { signedIn, signedUp, session } = sessionWrapper
    const currentHost = await getHostInfoById(id.toString())
    const currentMatches = await getHostMatchesById(id.toString())
    /* console.log('``````````````````````````````````````````````````````````')
    console.log(currentMatches)
    console.log('``````````````````````````````````````````````````````````') */
    if (!session || !session["user"]) {
        // not signed in / signed up
        return {
            props: {
                user: null,
                // TODO: Remove props when not signed in
                currentHost: currentHost,
                // TODO: null for serialize error
                currentMatches: null,
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
                currentMatches: currentMatches,
            },
        }
    }

    // signed in, share session with component
    return {
        props: {
            user: session,
            currentHost: currentHost,
            currentMatches: currentMatches,
        },
    }
}

export default HostProfile

