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
import { HostPending, HostRejected } from '../../components/host/status'
import { getSession } from '../../lib/auth/session'
import { serverSideRedirectTo } from '../../lib/auth/redirect'
import { getHostInfoById } from '../../lib/handlers/hosts'


interface HostRequestStatusProps {
    status: string
}

const HostRequestStatusPage: NextPage<HostRequestStatusProps> = (props): JSX.Element => {
    const { status } = props
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
                    {getBoxByStatus(status)}
                </HostLayout>
            </Box>
        </>
    )
}

function getBoxByStatus(status: string): JSX.Element {
    switch (status) {
        case 'pending':
            return (<HostPending />)
        case 'rejected':
            return (<HostRejected />)
    }
    // shouldn't happen
    return (<></>)
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
    let status = hostInfo?.status
    // not pending status
    if (status === 'accepted') {
        return serverSideRedirectTo('/hosts/profile')
    } else if (status !== 'rejected' && status !== 'pending') {
        status = 'pending'
    }
    return { props: { status } }
}

export default HostRequestStatusPage
