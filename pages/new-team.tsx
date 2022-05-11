import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import AuthLayout from '../components/layouts/AuthLayout'
import TermsOfServiceModal from '../components/modals/TermsOfServiceModal'
import PrivacyPolicyModal from '../components/modals/PrivacyPolicyModal'
import Footer from "../components/footer/footer";
import {
    Box,
    Container,
    Flex,
    Image,
    useDisclosure,
} from '@chakra-ui/react'
import NewTeamFields from '../components/newTeam/newTeamFields'
import { categories } from '../lib/handlers/categories'
import { RowDataPacket } from 'mysql2'
import { getHostInfoById } from '../lib/handlers/hosts'
import { getSession } from '../lib/auth/session'
import { serverSideRedirectTo } from '../lib/auth/redirect'
import { AccountType } from '../lib/models/accountType'


function NewTeam({ data }: RowDataPacket) {
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
                position="relative"
                w="100%"
                minH="100vh"
                bgGradient="linear-gradient(primary.purple, primary.white)"
            >
                <AuthLayout />
                <Box paddingBottom="4rem">

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
                                        categories={data}
                                    />
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
    const data = await categories()
    const { signedIn, signedUp, session } = await getSession(context)
    if (!signedIn || !session) {
        return serverSideRedirectTo('/login')
    }
    if (signedUp) {
        // not signed up (no `account_type`)
        switch (session.user.account_type) {
            case AccountType.ADMIN:
                return serverSideRedirectTo('/admin')
            case AccountType.TEAM:
                return serverSideRedirectTo('/team-profile')
            case AccountType.HOST:
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
        props: { data }
    }
}

export default NewTeam
