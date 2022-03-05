import type { NextPage } from 'next'
import Head from 'next/head'
import AuthLayout from '../components/layouts/AuthLayout'
import {
    Box,
} from '@chakra-ui/react'

const Request: NextPage = () => {
    return (
        <>
            <Head>
                <title>Request | Curlo</title>
            </Head>
            <Box
                position="absolute"
                w="100%"
                h="100vh"
                minW="md"
                bgGradient="linear-gradient(primary.purple, primary.white) repeat"
            >
                <AuthLayout>

                </AuthLayout>
            </Box>
        </>
    )
}

export default Request