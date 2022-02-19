import type { NextPage } from 'next'
import Head from 'next/head'
import StandardLayout from '../components/layouts/StandardLayout'

const About: NextPage = () => {
    return (
        <>
            <Head>
                <title>About | Curlo</title>
            </Head>
            <div style={{
                background: "linear-gradient(#735FED, #FFFFFF)",
                height: "100vh",
                width: '100%'
            }}>
                <StandardLayout />
            </div>
        </>
    )
}

export default About