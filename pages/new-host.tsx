import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { getSession } from '../lib/auth/session'
import TermsOfServiceModal from '../components/modals/TermsOfServiceModal'
import PrivacyPolicyModal from '../components/modals/PrivacyPolicyModal'
import AuthLayout from '../components/layouts/AuthLayout'
import NewHostFields from '../components/newHost/newHostFields'
import Footer from "../components/footer/footer";
import { serverSideRedirectTo } from '../lib/auth/redirect'
import { getHostInfoById } from '../lib/handlers/hosts'
import {
    Box,
    Container,
    Flex,
    useDisclosure,
} from '@chakra-ui/react'


const NewHost: NextPage = () => {
    const [phoneType, setPhoneType] = useState("")
    const [mounted, setMounted] = useState(false)
    const [isAgreedPP, setIsAgreedPP] = useState(false)
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
    const signupContainerHeight = "630"
    const popoverHeight = "450"

    useEffect(() => { setMounted(true) }, [])

    return (
        <>
            <Head>
                <title>New Host | Curlo</title>
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

                    <Container maxW="2xl" centerContent>
                        {/* Outer box */}
                        <Box minW="sm" maxW={{ base: "sm", md: "none" }} w="100%" h="auto" my="4" borderRadius="20" bg="white" shadow="md">
                            <Flex flexDirection="row" h="100%">
                                {/* Left */}
                                <Box
                                    display={{ base: "none", md: "block" }}
                                    borderRadius="20"
                                    bg="primary.green"
                                    h="auto"
                                    w="100%"
                                >
                                </Box>
                                {/* Sign up container (should only run on client side, e.g mounted) */}
                                <Box minW="sm" w="100%" h="100%" m={{ base: 0, md: 2 }} p={10} borderRadius="32">
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
                                            <NewHostFields
                                                phoneType={phoneType}
                                                onPhoneTypeChange={setPhoneType}
                                                isAgreedPP={isAgreedPP}
                                                onIsAgreedPPChange={() => setIsAgreedPP(!isAgreedPP)}
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
    if (!signedIn || !session) {
        return serverSideRedirectTo('/login')
    }
    if (signedUp) {
        // not signed up (no `account_type`)
        switch (session.user.account_type) {
            case 'admin':
                return serverSideRedirectTo('/admin')
            case 'curler':
                return serverSideRedirectTo('/team-profile')
            case 'host':
                const hostInfo = await getHostInfoById(session.user.id)
                const status = hostInfo?.status
                if (status === 'accepted') {
                    return serverSideRedirectTo('/hosts/profile')
                } else {
                    return serverSideRedirectTo('/hosts/request')
                }
        }
    }
    return {
        props: {},
    }
}

export default NewHost 
