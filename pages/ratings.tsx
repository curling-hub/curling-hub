import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Footer from "../components/footer/footer";
import { getSession } from 'next-auth/react'
import { Session } from 'next-auth'
import TeamLayout from '../components/layouts/TeamLayout'
import StandardLayout from '../components/layouts/StandardLayout'
import {
    Box
} from '@chakra-ui/react'
import RatingsBox from '../components/ratings/ratingsBox'


interface RatingsProps {
    user?: Session
}

const Ratings: NextPage<RatingsProps> = (props: RatingsProps) => {
    
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
                props.user ? 
                    <TeamLayout>
                        <RatingsBox/>
                    </TeamLayout>
                :
                    <StandardLayout>
                        <RatingsBox/>
                    </StandardLayout>
            }
            </Box>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)
    if (!session || !session["user"]) {
        // not signed in / signed up
        return {
            props: {
                user: null
            }
        }
    }

    const user = session["user"]
    if (!user["account_type"]) {
        // has not completed sign up up
        return {
            props: {
                user: null
            },
        }
    }

    // signed in, share session with component
    return {
        props: {
            user: session
        },
    }
}

export default Ratings
