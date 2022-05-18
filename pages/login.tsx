import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
// import React, { Component, Fragment } from 'react'
import TermsOfServiceModal from '../components/modals/TermsOfServiceModal'
import PrivacyPolicyModal from '../components/modals/PrivacyPolicyModal'
import AuthLayout from '../components/layouts/AuthLayout'
import LoginFields from '../components/login/LoginBox'
import Footer from "../components/footer/footer";
import { getSession } from '../lib/auth/session'
import { authPagesLoggedInRedirects, serverSideRedirectTo } from '../lib/auth/redirect'
import {
    Box,
    Container,
    Flex,
    useDisclosure,
} from '@chakra-ui/react'


const NewHost: NextPage = () => {
    const [email, setEmail] = useState("")
    const [mounted, setMounted] = useState(false)

    const {
        isOpen: privacyPolicyIsOpen = false,
        onOpen: privacyPolicyOnOpen,
        onClose: privacyPolicyOnClose,
    } = useDisclosure()
    const {
        isOpen: termsOfServiceIsOpen = false,
        onOpen: termsOfServiceOnOpen,
        onClose: termsOfServiceOnClose,
    } = useDisclosure()
    const signupContainerHeight = "380"
    const popoverHeight = "300"

    useEffect(() => { setMounted(true) }, [])

    return (
        <>
            <Head>
                <title>Login | Curlo</title>
            </Head>
            <Box
                position="relative"
                w="100%"
                minH="100vh"
                minW="md"
                bgGradient="linear-gradient(#735FED, #FFFFFF) repeat"
            >
                <AuthLayout />
                <Box paddingBottom="4rem">
                    <Container maxW="2xl" centerContent paddingBottom="4rem">
                        {/* Outer box */}
                        <Box minW="sm" maxW={{ base: "sm", md: "none" }} w="100%" h={signupContainerHeight} my="4" borderRadius="20" bg="white" shadow="md">
                            <Flex flexDirection="row" h="100%">
                                <Box minW="sm" w="50%" h="100%" m={{ base: 0, md: 0 }} p={10} borderRadius="20" bg="primary.green" >
                                    {mounted && (
                                        <>
                                            <PrivacyPolicyModal
                                                isOpen={privacyPolicyIsOpen}
                                                onClose={privacyPolicyOnClose}
                                            />
                                            <TermsOfServiceModal
                                                isOpen={termsOfServiceIsOpen}
                                                onClose={termsOfServiceOnClose}
                                            />
                                            <LoginFields
                                                email={email}
                                                onEmailChange={setEmail}
                                                onOpenPrivacyPolicy={() => { privacyPolicyOnOpen() }}
                                                onOpenTermsOfService={() => { termsOfServiceOnOpen() }}
                                            />
                                        </>
                                    )}

                                </Box>
                            </Flex>
                        </Box>
                    </Container>
                </Box>
                <Footer />
            </Box>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { signedIn, signedUp, session } = await getSession(context)
    if (!signedIn) {
        return { props: {} }
    } else if (!signedUp || !session) { //Partially setup account
        return serverSideRedirectTo('/new-team')
    }

    return authPagesLoggedInRedirects(session.user.id, session.user.account_type)
}

export default NewHost