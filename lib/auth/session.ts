import { Session } from 'next-auth'
import { getSession as nextAuthGetSession, GetSessionParams } from 'next-auth/react'
import { ParsedUrlQuery } from 'querystring'

import { serverSideRedirectTo } from './redirect'


interface SessionInfo {
    signedIn: boolean
    signedUp: boolean
    session?: Session
}

interface SessionWrapper extends SessionInfo {
}

export async function getSession(context: GetSessionParams | undefined): Promise<SessionWrapper> {
    const session = await nextAuthGetSession(context)
    const signedIn = !!session && !!session["user"]
    if (!signedIn) {
        return {
            signedIn: false,
            signedUp: false,
            session: undefined,
        }
    }
    const user = session["user"]
    const signedUp = !!user["account_type"]
    if (!signedUp) {
        return {
            signedIn: true,
            signedUp: false,
            session: session,
        }
    }
    return {
        signedIn: true,
        signedUp: true,
        session: session,
    }
}

export function getSessionServerSideResult(s: SessionInfo) {
    if (!s.signedIn) {
        // is not signed in
        return serverSideRedirectTo('/login')
    }
    if (!s.signedUp) {
        // signed in but has no account type
        return serverSideRedirectTo('/new-team')
    }
    return {
        props: {},
    }
}

export function convertAndVerifyContextId(params: ParsedUrlQuery | undefined): number | null {
    if (!params?.id) {
        return null
    }
    const hostIdStr = Array.isArray(params.id) ? params.id[0] : params.id
    if (!hostIdStr) {
        return null
    }
    return Number.parseInt(hostIdStr)
}
