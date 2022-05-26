import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { getSession, getSessionServerSideResult } from '../lib/auth/session'
import TeamLayout from '../components/layouts/TeamLayout'
import StandardLayout from '../components/layouts/StandardLayout'
import {
    Box
} from '@chakra-ui/react'
import RatingsBox from '../components/ratings/ratingsBox'
import RatingsBoxSmall from '../components/ratings/ratingsBoxSmall'
import { getAllCategories } from '../lib/handlers/categories'
import { Category } from '../lib/models/category'
import { getRankingsByCategorySimple, getTeamIdByUserId } from '../lib/handlers/teams'
import { TeamRanking } from '../lib/models/teams'
import { useEffect, useState } from 'react'
import { sequelize } from '../lib/db'
import Footer from "../components/footer/footer";
import { AccountType } from '../lib/models/accountType'
import AdminLayout from '../components/layouts/AdminLayout'
import HostLayout from '../components/layouts/HostLayout'
import { serverSideRedirectTo } from '../lib/auth/redirect'
import { getHostIdByUserId, getHostInfoByUserId } from '../lib/handlers/hosts'
import StatusBanner from '../components/host/status/statusBanner'
import RequestModal from '../components/modals/RequestModal'

interface RatingsProps {
    regStatus: boolean, // true = fully registered, false = incomplete
    categories: Category[],
    rankings: TeamRanking[]
    accountType?: AccountType,
    id?: number | null
}

function useWindowDimensions() {

    const hasWindow = typeof window !== 'undefined';

    function getWindowDimensions() {
        const width = hasWindow ? window.innerWidth : null;
        const height = hasWindow ? window.innerHeight : null;
        return {
            width,
            height,
        };
    }

    function handleResize() {
        setWindowDimensions(getWindowDimensions());
    }

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        if (hasWindow) {
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [hasWindow, handleResize]);

    return windowDimensions;
}

function ratingsPageLayout(accountType?: AccountType, id?: number | null) {
    switch (accountType) {
        case AccountType.ADMIN:
            return <AdminLayout />
        case AccountType.HOST:
            return <HostLayout hostId={id} />
        case AccountType.TEAM:
            return <TeamLayout teamId={id} />
        default:
            return <StandardLayout />
    }
}


const Ratings: NextPage<RatingsProps> = (props: RatingsProps) => {
    const {
        regStatus,
        categories,
        rankings,
        accountType,
        id,
    } = props
    const { height, width } = useWindowDimensions()
    const isSmallScreen = width && width < 750 ? true : false
    const [mounted, setMounted] = useState(false)
    const [showStatusModal, setShowStatusModal] = useState(false)
    const [showBanner, setShowBanner] = useState(regStatus)
    useEffect(() => { setMounted(true) }, [])
    const pageNum = height ? (Math.floor(((height) * 0.7 * 0.8) / 33) - 3) : 10

    return (
        <>
            <Head>
                <title>Ratings | Curlo</title>
            </Head>
            <Box
                position="relative"
                w="100%"
                minH="100vh"
                bgGradient="linear-gradient(primary.purple, primary.white)"
            >
                {mounted && !isSmallScreen &&
                    <>
                        <StatusBanner
                            isOpen={showBanner}
                            onClose={() => setShowBanner(false)}
                            openModal={() => setShowStatusModal(true)}
                        />
                        {ratingsPageLayout(accountType, id)}
                        <RequestModal
                            isOpen={showStatusModal}
                            onClose={() => setShowStatusModal(false)}
                        />
                        <RatingsBox
                            categories={categories}
                            teamRanking={rankings}
                            tableSize={pageNum}
                        />
                    </>
                }
                {mounted && isSmallScreen &&
                    <>
                        <StatusBanner
                            isOpen={showBanner}
                            onClose={() => setShowBanner(false)}
                            openModal={() => setShowStatusModal(true)}
                        />
                        {ratingsPageLayout(accountType, id)}
                        <RequestModal
                            isOpen={showStatusModal}
                            onClose={() => setShowStatusModal(false)}
                        />
                        <RatingsBoxSmall
                            categories={categories}
                            teamRanking={rankings}
                            tableSize={pageNum}
                        />
                    </>
                }
                <Footer />
            </Box>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    if (process.env.NODE_ENV === 'test' || process.env.TEST !== undefined) {
        await sequelize.sync()
    }
    const { signedUp, signedIn, session } = await getSession(context)
    const categories = await getAllCategories()
    const rankings = await getRankingsByCategorySimple(1)
    
    if (!signedIn) {
        return {
            props: {
                regStatus: false,
                categories: categories,
                rankings: rankings
            }
        }
    } else if (!signedUp || !session) { //Partially setup account
        return serverSideRedirectTo('/new-team')
    }
    
    const userId = session.user.id
    switch (session.user.account_type) {
        case AccountType.ADMIN:
            return {
                props: { regStatus: false, categories: categories, rankings: rankings, accountType: AccountType.ADMIN }
            }
        case AccountType.HOST:
            const hostId = await Promise.all([getHostIdByUserId(userId)])
            const hostInfoList = await getHostInfoByUserId(userId)

            if (hostInfoList.length !== 0) {
                const hostInfo = hostInfoList[0]
                const status = hostInfo.status
                
                if (status === 'pending') {
                    return {
                        props: { regStatus: true, categories: categories, rankings: rankings, accountType: AccountType.HOST, id: hostId }
                    }
                } else {
                    return {
                        props: { regStatus: false, categories: categories, rankings: rankings, accountType: AccountType.HOST, id: hostId }
                    }
                }
            } else {
                return serverSideRedirectTo('/')
            }
            
        case AccountType.TEAM:
            const teamId = await Promise.all([getTeamIdByUserId(userId)])
            return {
                props: { regStatus: false, categories: categories, rankings: rankings, accountType: AccountType.TEAM, id: teamId }
            }
    }
    return {
        props: {
            regStatus: false,
            categories: categories,
            rankings: rankings
        },
    }
}

export default Ratings
