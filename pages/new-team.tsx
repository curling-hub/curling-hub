import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
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
import type { Category } from '../lib/models'
import { getAllCategories } from '../lib/handlers/categories'
import { getSession } from '../lib/auth/session'
import { authPagesLoggedInRedirects, serverSideRedirectTo } from '../lib/auth/redirect'


interface NewTeamProps {
    categories: Category[],
}

function NewTeam(props: NewTeamProps) {
    const { categories } = props
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

    const router = useRouter()

    const onSubmit = async (values: any) => {
        const cats = values.categories.map((category: { value: number }) => category.value)

        var req = {}

        if (values.gameMode === 'doubles') {
            req = {
                team: values.team,
                curler1: values.curler1,
                curler2: values.curler2,
                categories: values.categories.filter((category: { label: string }) => category.label === 'Doubles').map((category: { value: number }) => category.value),
            }
        } else if (values.showAlternate) {
            req = {
                team: values.team,
                curler1: values.curler1,
                curler2: values.curler2,
                curler3: values.curler3,
                curler4: values.curler4,
                alternate: values.alternate,
                categories: cats,
            }
        } else {
            req = {
                team: values.team,
                curler1: values.curler1,
                curler2: values.curler2,
                curler3: values.curler3,
                curler4: values.curler4,
                categories: cats,
            }
        }

        const res = await fetch('/api/team/create', {
            body: JSON.stringify(req),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })

        if (res.status == 200) {
            const data = await res.json()
            const teamId = data['data']['teamId']
            router.push(`/teams/${teamId}/profile`)
        } else {
            const result = await res.json()
            alert("error: " + result.error)
        }
    }

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
                                    <Image src="/curlo_Logo.svg" alt="Curlo logo" w="60%" h="30%" mb={10} />
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
                                        categories={categories}
                                        onSubmit={onSubmit}
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
    const categories = await getAllCategories()
    const { signedIn, signedUp, session } = await getSession(context)
    if (!signedIn || !session) {
        return serverSideRedirectTo('/signup')
    }
    if (signedUp) {
        return authPagesLoggedInRedirects(session.user.id, session.user.account_type)
    }
    return {
        props: { categories }
    }
}

export default NewTeam
