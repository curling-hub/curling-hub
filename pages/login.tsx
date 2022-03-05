import type { NextPage } from 'next'
import Head from 'next/head'
import AuthLayout from '../components/layouts/AuthLayout'
import LoginBox from '../components/LoginBox'

const Login: NextPage = () => {
    return (
        <>
            <Head>
                <title>Login | Curlo</title>
            </Head>
            <div style={{
                background: 'linear-gradient(#735FED, #FFFFFF)',
                height: "100vh",
                width: '100%'
            }}>
                <AuthLayout>
                    <LoginBox/>
                </AuthLayout>
            </div>
        </>
    )
}

export default Login