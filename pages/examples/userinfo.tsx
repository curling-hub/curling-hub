import type { NextPage, NextPageContext } from 'next'
import { useSession, getSession, signIn, signOut } from 'next-auth/react'
import { Button } from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'
import UserLayout from '../../components/layouts/UserLayout'

const ExampleUserInfo: NextPage = () => {
    const { data: session, status } = useSession()
    const loading = status === 'loading'
    return (
        <>
            <Head>
                <title>Profile | curlo</title>
            </Head>
            <div style={{
                background: "linear-gradient(#735FED, #FFFFFF)",
                height: "100vh",
                width: "100%",
            }}>
                <UserLayout>
                    {session ? (
                        <>
                        <pre>{JSON.stringify(session, null, 2)}</pre>
                            <Button onClick={() => signOut({ redirect: false })}>
                                Sign out
                            </Button>
                        </>
                    ) : (
                        <Button onClick={() => signIn()}>Sign in</Button>
                    )}
                </UserLayout>
            </div>
        </>
    )
}

// Prerender the `session` object on the server side
export async function getServerSideProps(context: NextPageContext) {
    return {
        // 404 not found if in production
        notFound: process.env.NODE_ENV === 'production',
        props: {
            session: await getSession(context),
        },
    }
}

export default ExampleUserInfo
