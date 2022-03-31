import type { NextPage } from 'next'
import Head from 'next/head'
import AuthLayout from '../components/layouts/AuthLayout'
import { Box, Button, Container } from '@chakra-ui/react'

const NewTeam: NextPage = () => {
    return (
        <>
            <Head>
                <title>New Team | Curlo</title>
            </Head>
            <Box
                position="absolute"
                w="100%"
                h="100vh"
                bgGradient="linear-gradient(primary.purple, primary.white)"
            >
                <AuthLayout />
            </Box>
        </>
    )
}

export default NewTeam