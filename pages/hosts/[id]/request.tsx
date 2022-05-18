import type { GetServerSideProps, NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import {
    Box,
    Container,
    Text,
    VStack,
} from '@chakra-ui/react'

import HostLayout from '../../../components/layouts/HostLayout'
import { HostPending, HostRejected } from '../../../components/host/status'
import { convertAndVerifyContextId, getSession, getSessionServerSideResult } from '../../../lib/auth/session'
import { hostPagesLoggedInRedirects, serverSideRedirectTo } from '../../../lib/auth/redirect'
import { getHostInfoById, isHostAdmin } from '../../../lib/handlers/hosts'
import { AccountType } from '../../../lib/models/accountType'


interface HostRequestStatusProps {
    status: string
    hostId: number
}

const HostRequestStatusPage: NextPage<HostRequestStatusProps> = (props): JSX.Element => {
    const { hostId, status } = props
    return (
        <>
            <Head>
                <title>Request Status | Curlo</title>
            </Head>
            <Box
                position="absolute"
                w="100%"
                h="100vh"
                bgGradient="linear-gradient(primary.purple, primary.white)"
            >
                <HostLayout hostId={hostId}>
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

    const [hostInfo, hasPermission] = await Promise.all([
        getHostInfoById(hostId),
        isHostAdmin(userId, hostId)
    ])
    if (!hasPermission) {
        return { notFound: true }
    }
    let status = hostInfo?.status
    if (status === 'accepted') {
        return serverSideRedirectTo(`/hosts/${hostId}/profile`)
    } else if (status !== 'rejected' && status !== 'pending') {
        status = 'pending'
    }
    return { props: { status, hostId } }
}

export default HostRequestStatusPage
