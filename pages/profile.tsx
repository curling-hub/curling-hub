import type { NextPage } from 'next'
import Head from 'next/head'
import UserLayout from '../components/layouts/UserLayout'

const Profile: NextPage = () => {
    return (
        <>
            <Head>
                <title>Profile | curlo</title>
            </Head>
            <div style={{
                background: "linear-gradient(#735FED, #FFFFFF)",
                height: "100vh",
                width: '100%'
            }}>
                <UserLayout />
            </div>
        </>
    )
}

export default Profile
