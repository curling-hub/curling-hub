import type { NextPage } from 'next'
import Head from 'next/head'
import AuthLayout from '../components/layouts/AuthLayout'

const Signup: NextPage = () => {
    return (
        <>
            <Head>
                <title>Signup | Curlo</title>
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

export default Signup
