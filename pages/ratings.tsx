import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { getSession } from '../lib/auth/session'
import { Session } from 'next-auth'
import TeamLayout from '../components/layouts/TeamLayout'
import StandardLayout from '../components/layouts/StandardLayout'
import {
    Box, useMediaQuery
} from '@chakra-ui/react'
import RatingsBox from '../components/ratings/ratingsBox'
import RatingsBoxSmall from '../components/ratings/ratingsBoxSmall'
import { getAllCategories } from '../lib/handlers/categories'
import { Category } from '../lib/models/category'
import { getAllRankingsSimple, getRankingsByCategorySimple } from '../lib/handlers/teams'
import { TeamRanking } from '../lib/models/teams'
import { useEffect, useState } from 'react'
import { sequelize } from '../lib/db'
import Footer from "../components/footer/footer";
import { AccountType } from '../lib/models/accountType'
import AdminLayout from '../components/layouts/AdminLayout'
import HostLayout from '../components/layouts/HostLayout'

interface RatingsProps {
    user?: Session,
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
        user,
        categories,
        rankings,
        accountType,
        id,
    } = props
    const { height, width } = useWindowDimensions()
    const isSmallScreen = width && width < 750 ? true : false
    const [mounted, setMounted] = useState(false)
    useEffect(() => { setMounted(true) }, [])
    const pageNum = height ? (Math.floor(((height) * 0.7 * 0.8) / 33) - 3) : 10

    return (
        <>
            <Head>
                <title>Ratings | curlo</title>
            </Head>
            <Box
                position="relative"
                w="100%"
                minH="100vh"
                bgGradient="linear-gradient(primary.purple, primary.white)"
            >
                {mounted && !isSmallScreen &&
                    <>
                        {ratingsPageLayout(accountType, id)}
                        <RatingsBox
                            categories={categories}
                            teamRanking={rankings}
                            tableSize={pageNum}
                        />
                    </>
                }
                {mounted && isSmallScreen &&
                    <>
                        {ratingsPageLayout(accountType, id)}
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

    if (!session || !signedIn) {
        // not signed in / signed up
        return {
            props: {
                user: null,
                categories: categories,
                rankings: rankings
            }
        }
    }

    if (!signedUp) {
        // has not completed sign up up
        return {
            props: {
                session,
                categories: categories,
                rankings: rankings
            },
        }
    }

    // signed in, share session with component
    return {
        props: {
            session,
            categories: categories,
            rankings: rankings
        },
    }
}

export default Ratings
