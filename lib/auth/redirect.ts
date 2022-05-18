import { getHostInfoByUserId } from "../handlers/hosts";
import { getTeamIdByUserId } from "../handlers/teams";
import { AccountType } from "../models/accountType";

export function serverSideRedirectTo(target: string) {
    return {
        redirect: {
            destination: target,
        },
        props: {},
    }
}

export async function authPagesLoggedInRedirects(userId: string, accountType?: string) {
    switch (accountType) {
        case AccountType.ADMIN:
            return serverSideRedirectTo('/admin-requests')
        case AccountType.HOST:
            const hostInfoList = await getHostInfoByUserId(userId)
            if (hostInfoList.length !== 0) {
                const hostInfo = hostInfoList[0]
                const status = hostInfo.status
                if (status === 'accepted') {
                    return serverSideRedirectTo(`/hosts/${hostInfo.hostId}/profile`)
                } else {
                    return serverSideRedirectTo(`/hosts/${hostInfo.hostId}/request`)
                }
            } else {
                return serverSideRedirectTo('/')
            }
        case AccountType.TEAM:
            const teamId = await getTeamIdByUserId(userId)
            return serverSideRedirectTo(teamId ? `/teams/${teamId}/profile` : '/')
    }
    return serverSideRedirectTo('/')
}

export async function hostPagesLoggedInRedirects(userId: string, accountType?: string) {
    switch (accountType) {
        case AccountType.ADMIN:
            return serverSideRedirectTo('/admin-requests')
        case AccountType.TEAM:
            const teamId = await getTeamIdByUserId(userId)
            return serverSideRedirectTo(teamId ? `/teams/${teamId}/profile` : '/')
    }
    return serverSideRedirectTo('/')
}

export async function teamPagesLoggedInRedirects(userId: string, accountType?: string) {
    switch (accountType) {
        case AccountType.ADMIN:
            return serverSideRedirectTo('/admin-requests')
        case AccountType.HOST:
            const hostInfoList = await getHostInfoByUserId(userId)
            if (hostInfoList.length !== 0) {
                const hostInfo = hostInfoList[0]
                const status = hostInfo.status
                if (status === 'accepted') {
                    return serverSideRedirectTo(`/hosts/${hostInfo.hostId}/profile`)
                } else {
                    return serverSideRedirectTo(`/hosts/${hostInfo.hostId}/request`)
                }
            } else {
                return serverSideRedirectTo('/')
            }
    }
    return serverSideRedirectTo('/')
}