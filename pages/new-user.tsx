import type { NextPage } from 'next'
import Head from 'next/head'
import AuthLayout from '../components/layouts/AuthLayout'

const NewUser: NextPage = () => {
    return (
        <>
            <Head>
                <title>Signup User | Curlo</title>
            </Head>
            <div style={{
                background: "linear-gradient(#735FED, #FFFFFF)",
                height: "100vh",
                width: '100%'
            }}>
                <AuthLayout />
            </div>
        </>
    )
}

export default NewUser
