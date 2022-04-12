import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
// import React, { Component, Fragment } from 'react'
import TermsOfServiceModal from '../components/modals/TermsOfServiceModal'
import PrivacyPolicyModal from '../components/modals/PrivacyPolicyModal'
import AuthLayout from '../components/layouts/AuthLayout'
import NewHostFields from '../components/newHost/newHostFields'
import LoginFields from '../components/login/LoginBox'
import Footer from "../components/footer/footer";
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
    const signupContainerHeight = "330"
    const popoverHeight = "450"

    useEffect(() => { setMounted(true) }, [])

    return (
        <>
            <Head>
                <title>Login | Curlo</title>
            </Head>
            <Box
                position="absolute"
                w="100%"
                h="100vh"
                minW="md"
                bgGradient="linear-gradient(#735FED, #FFFFFF) repeat"
            >
                <AuthLayout>
                    <Container maxW="xl" centerContent>
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
                </AuthLayout>
                <Footer />
            </Box>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)
    if (!session || !session["user"]) {
        // not signed in
        return {
            props: {}
        }
    }
    const user = session["user"]
    if (!user["account_type"]) {
        // has not completed sign up up
        return {
            redirect: {
                destination: "/new-user",
            },
            props: {},
        }
    }
    // already signed in, redirect
    return {
        // TODO: Where do we redirect to?
        // redirect: {
        //     destination: "/",
        // },
        props: {},
    }
}

export default NewHost 
