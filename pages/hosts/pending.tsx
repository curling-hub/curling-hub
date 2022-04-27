import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import {
    Box,
    Container,
    Text,
    VStack,
} from '@chakra-ui/react'

import HostLayout from '../../components/layouts/HostLayout'
import { getSession } from '../../lib/auth/session'
import { serverSideRedirectTo } from '../../lib/auth/redirect'
import { getHostInfoById } from '../../lib/handlers/hosts'

const HostPendingPage: NextPage = (): JSX.Element => {
    return (
        <>
            <Head>
                <title>Request Pending | Curlo</title>
            </Head>
            <Box
                position="absolute"
                w="100%"
                h="100vh"
                bgGradient="linear-gradient(primary.purple, primary.white)"
            >
                <HostLayout>
                    <Container
                        maxW="md"
                        borderRadius={12}
                        bgColor="white"
                        px={8}
                        py={4}
                    >
                        <VStack>
                            <Text fontSize={24} fontWeight="bold" textAlign="center">
                                Your account application is pending. Please check back later!
                            </Text>
                            <Image src="/curloLogo2.svg" alt="Curlo Logo" width="100%" height="100%" />
                        </VStack>
                    </Container>
                </HostLayout>
            </Box>
        </>
    )
}

export async function getServerSideProps(context: NextPageContext) {
    const { signedIn, signedUp, session } = await getSession(context)
    if (!signedIn || !session) {
        // not signed in
        return serverSideRedirectTo('/login')
    }
    if (!signedUp) {
        // not signed up
        return serverSideRedirectTo('/new-host')
    }
    switch (session.user.account_type) {
        // incorrect account type
        case 'admin':
            return serverSideRedirectTo('/admin')
        case 'curler':
            return serverSideRedirectTo('/team-profile')
        case undefined:
        case null:
            return serverSideRedirectTo('/new-host')
    }
    const hostInfo = await getHostInfoById(session.user.id)
    const status = hostInfo?.status
    // not pending status
    if (status === 'accepted') {
        return serverSideRedirectTo('/hosts/profile')
    } else if (status === 'rejected') {
        return serverSideRedirectTo('/hosts/rejected')
    }
    return { props: {} }
}

export default HostPendingPage
