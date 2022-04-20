import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { getSession } from 'next-auth/react'
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
import { getAllRankings } from '../lib/handlers/teams'
import { TeamRanking } from '../lib/models/teams'

interface RatingsProps {
    user?: Session,
    categories: Category[],
    rankings: TeamRanking[]
}

const Ratings: NextPage<RatingsProps> = (props: RatingsProps) => {
    const [isSmallScreen] = useMediaQuery("(max-width: 768px)")
    console.log(isSmallScreen)
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
                    !isSmallScreen && props.user &&
                        <TeamLayout>
                            <RatingsBox
                                categories={props.categories}
                                teamRanking={props.rankings}
                                tableSize={20}
                            />
                        </TeamLayout>
                }        
                {   !isSmallScreen && !props.user &&
                        <StandardLayout>
                            <RatingsBox
                                categories={props.categories}
                                teamRanking={props.rankings}
                                tableSize={20}
                            />
                        </StandardLayout>
                }
                {
                    props.user &&
                        <TeamLayout>
                            <RatingsBoxSmall
                                categories={props.categories}
                                teamRanking={props.rankings}
                                tableSize={8}
                            />
                        </TeamLayout>
                }        
                {   !props.user &&
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
    const session = await getSession(context)
    const categories = await getAllCategories()
    const rankings = await getAllRankings()

    if (!session || !session["user"]) {
        // not signed in / signed up
        return {
            props: {
                user: null,
                categories: categories,
                rankings: rankings
            }
        }
    }

    const user = session["user"]
    if (!user["account_type"]) {
        // has not completed sign up up
        return {
            props: {
                user: null,
                categories: categories,
                rankings: rankings
            },
        }
    }

    // signed in, share session with component
    return {
        props: {
            user: session,
            categories: categories,
            rankings: rankings
        },
    }
}

export default Ratings
