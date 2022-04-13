import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import NextLink from 'next/link'
import { signIn } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { getSession, getSessionServerSideResult } from '../lib/auth/session'
import {
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    Flex,
    FormControl,
    HStack,
    Link as ChakraLink,
    Input,
    Text,
    Popover,
    PopoverAnchor,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    VStack,
    useDisclosure,
} from '@chakra-ui/react'

import AuthLayout from '../components/layouts/AuthLayout'
import TermsOfServiceModal from '../components/modals/TermsOfServiceModal'
import PrivacyPolicyModal from '../components/modals/PrivacyPolicyModal'
import Footer from "../components/footer/footer";
import { serverSideRedirectTo } from '../lib/auth/redirect'


const Signup: NextPage = () => {
    const [email, setEmail] = useState("")
    const [isHost, setIsHost] = useState(false)
    const [mounted, setMounted] = useState(false)
    const hostAccountDisclosure = useDisclosure()
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
                <title>Signup | Curlo</title>
            </Head>
            <Box
                position="relative"
                w="100%"
                minH="100vh"
                bgGradient="linear-gradient(primary.purple, primary.white)"
            >
                <AuthLayout />
                <Box paddingBottom="4rem">

                    <Container maxW="2xl" centerContent h="100vh">
                        {/* Outer box */}
                        <Box minW="sm" maxW={{ base: "sm", md: "none" }} w="100%" h={signupContainerHeight} my="4" borderRadius="20" bg="white" shadow="md">
                            <Flex flexDirection="row" h="100%">
                                {/* Left */}
                                <Box
                                    display={{ base: "none", md: "block" }}
                                    borderRadius="20"
                                    bg="primary.green"
                                    h="100%"
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
                                            <SignupFields
                                                email={email}
                                                onEmailChange={setEmail}
                                                isHost={isHost}
                                                hostAccountDisclosure={hostAccountDisclosure}
                                                onIsHostChange={() => setIsHost(!isHost)}
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
    const sessionWrapper = await getSession(context)
    const { signedIn, signedUp, session } = sessionWrapper
    if (!signedIn) {
        // not signed in / signed up
        return { props: {} }
    }
    if (!signedUp) {
        // has not completed sign up
        return serverSideRedirectTo('/new-team')
    }
    // already signed in, redirect
    return serverSideRedirectTo('/team-profile')
}

interface SignupFieldsProps {
    email: string;
    onEmailChange: (email: string) => void;
    isHost: boolean;
    onIsHostChange: () => void;
    hostAccountDisclosure: ReturnType<typeof useDisclosure>;
    onOpenPrivacyPolicy: () => void;
    onOpenTermsOfService: () => void;
}

function SignupFields(props: SignupFieldsProps) {
    const {
        email,
        onEmailChange,
        isHost,
        onIsHostChange,
        onOpenPrivacyPolicy,
        onOpenTermsOfService,
        hostAccountDisclosure,
    } = props
    const { onOpen: onPopoverOpen, onClose: onPopoverClose, isOpen: isPopoverOpen } = hostAccountDisclosure
    const helperTextFontSize = "12"
    return (
        <VStack alignItems="start" spacing="4">
            <Text fontSize="3xl">Sign up</Text>
            <FormControl>
                <Input
                    borderRadius="full"
                    focusBorderColor="green.400"
                    shadow="sm"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => onEmailChange(e.target.value)}
                />
            </FormControl>
            <Button
                isFullWidth
                bg="primary.green"
                borderRadius="full"
                boxShadow="md"
                _hover={{ bg: "green.400" }}
                _active={{ bg: "green.600" }}
                _focus={{ boxShadow: "lg" }}
                onClick={() => signIn("email", { email })}
            >
                Sign up with email
            </Button>
            <Divider orientation="horizontal" mt={2} width="100%" />
            <Button
                isFullWidth
                bg="primary.green"
                borderRadius="full"
                boxShadow="md"
                _hover={{ bg: "green.400" }}
                _active={{ bg: "green.600" }}
                _focus={{ boxShadow: "lg" }}
                onClick={() => signIn("google")}
            >
                Sign up with Google
            </Button>
            <VStack w="100%" spacing="1">
                <Text fontSize={helperTextFontSize}>
                    Already have an account?{" "}
                    <NextLink href="/login" passHref>
                        <ChakraLink color="blue.500">Login</ChakraLink>
                    </NextLink>
                </Text>
                <Text fontSize={helperTextFontSize}>
                    <Button variant="link" color="blue.500" size={helperTextFontSize} onClick={onOpenTermsOfService}>
                        Terms of Service
                    </Button>
                    {" "}and{" "}
                    <Button variant="link" color="blue.500" size={helperTextFontSize} onClick={onOpenPrivacyPolicy}>
                        Privacy Policy
                    </Button>
                </Text>
            </VStack>
        </VStack>
    )
}

interface HostAccountPopoverProps {
    h?: number | string
    isOpen?: boolean
    onOpen?: () => void
    onClose?: () => void
}

function HostAccountPopover(props: HostAccountPopoverProps) {
    const { h, isOpen = false, onOpen = (() => { }), onClose = (() => { }) } = props
    return (
        <Popover
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
        >
            <PopoverAnchor>
                <Text>{" "}</Text>
            </PopoverAnchor>
            <PopoverContent w="sm" borderRadius={16} border="none" h={h} bg="primary.green">
                <PopoverHeader>
                    Host Account
                </PopoverHeader>
                <PopoverCloseButton my={1} />
                <PopoverBody>
                    <HostAccountHint />
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

function HostAccountHint() {
    return (
        <Text textColor="black" textAlign="center">
            Host accounts are for curling locations.
            If you want to join a curling team, uncheck to create a regular account.
        </Text>
    )
}

export default Signup
