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
import { getAllRankingsSimple } from '../lib/handlers/teams'
import { TeamRanking } from '../lib/models/teams'
import { useEffect, useState } from 'react'

interface RatingsProps {
    user?: Session,
    categories: Category[],
    rankings: TeamRanking[]
}

const Ratings: NextPage<RatingsProps> = (props: RatingsProps) => {
    const [isSmallScreen] = useMediaQuery("(max-width: 768px)")
    const [mounted, setMounted] = useState(false)
    useEffect(() => { setMounted(true) }, [])
    
    return (
        <>
            <Head>
                <title>Ratings | curlo</title>
            </Head>
            <Box
                position="absolute"
                w="100%"
                h="100vh"
                bgGradient="linear-gradient(primary.purple, primary.white)"
            >
                {
                    mounted && !isSmallScreen && props.user &&
                        <TeamLayout>
                            <RatingsBox
                                categories={props.categories}
                                teamRanking={props.rankings}
                                tableSize={20}
                            />
                        </TeamLayout>
                }        
                {   mounted && !isSmallScreen && !props.user &&
                        <StandardLayout>
                            <RatingsBox
                                categories={props.categories}
                                teamRanking={props.rankings}
                                tableSize={20}
                            />
                        </StandardLayout>
                }
                {
                    mounted && isSmallScreen && props.user &&
                        <TeamLayout>
                            <RatingsBoxSmall
                                categories={props.categories}
                                teamRanking={props.rankings}
                                tableSize={8}
                            />
                        </TeamLayout>
                }        
                {   mounted && isSmallScreen && !props.user &&
                        <StandardLayout>
                            <RatingsBoxSmall
                                categories={props.categories}
                                teamRanking={props.rankings}
                                tableSize={8}
                            />
                        </StandardLayout>
                }
            </Box>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { signedUp, signedIn, session } = await getSession(context)
    const categories = await getAllCategories()
    const rankings = await getAllRankingsSimple()

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
                user: null,
                categories: categories,
                rankings: rankings
            },
        }
    }

    // signed in, share session with component
    return {
        props: {
            session,
            user: session,
            categories: categories,
            rankings: rankings
        },
    }
}

export default Ratings
