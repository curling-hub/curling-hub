import type { NextPage } from 'next'
import Head from 'next/head'
import StandardLayout from '../components/layouts/StandardLayout'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home | Curlo</title>
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

export default Home