import type { NextPage } from 'next'
import Head from 'next/head'
import AuthLayout from '../components/layouts/AuthLayout'
import TermsOfServiceModal from '../components/modals/TermsOfServiceModal'
import PrivacyPolicyModal from '../components/modals/PrivacyPolicyModal'
import { 
    Box, 
    Container, 
    Flex, 
    Image, 
    useDisclosure,
    Stack,
    VStack 
} from '@chakra-ui/react'
import NewTeamFields from '../components/newTeam/newTeamFields'
import { useState } from 'react'

const NewTeam: NextPage = () => {
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
                <AuthLayout>
                    <Container maxW="2xl" centerContent>
                        {/* Outer box */}
                        <Box minW="sm" maxW={{ base: "sm", md: "none" }} w="100%" h="auto" my="4" borderRadius="20" bg="white" shadow="md">
                            <Flex flexDirection="row" h="100%">
                                {/* Left */}
                                <Box
                                    display="flex"
                                    alignItems="end"
                                    justifyContent="center"
                                    borderRadius="20"
                                    bg="primary.green"
                                    h="auto"
                                    w="100%"
                                >
                                     <Image src="/curlo_Logo.svg" w="60%" h="30%" />
                                </Box>
                                {/* Sign up container (should only run on client side, e.g mounted) */}
                                <Box minW="sm" w="100%" h="100%" m={{ base: 0, md: 2 }} p={10} borderRadius="32">
                                    <PrivacyPolicyModal
                                        isOpen={privacyPolicyIsOpen}
                                        onClose={privacyPolicyOnClose}
                                    />
                                    <TermsOfServiceModal
                                        isOpen={termsOfServiceIsOpen}
                                        onClose={termsOfServiceOnClose}
                                    />
                                    <NewTeamFields
                                        onOpenPrivacyPolicy={() => { privacyPolicyOnOpen() }}
                                        onOpenTermsOfService={() => { termsOfServiceOnOpen() }}
                                    />
                                </Box>
                            </Flex>
                        </Box>
                    </Container>
                </AuthLayout>
            </Box>
        </>
    )
}

export default NewTeam