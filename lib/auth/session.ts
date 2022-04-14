import { Session } from 'next-auth'
import { getSession as nextAuthGetSession, GetSessionParams } from 'next-auth/react'

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
            session:  undefined,
        }
    }
    const user = session["user"]
    const signedUp = !!user["account_type"]
    if (!signedUp) {
        return {
            signedIn: true,
            signedUp: false,
            session:  session,
        }
    }
    return {
        signedIn: true,
        signedUp: true,
        session:  session,
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
