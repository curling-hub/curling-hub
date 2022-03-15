import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
// import React, { Component, Fragment } from 'react'
import TermsOfServiceModal from '../components/modals/TermsOfServiceModal'
import PrivacyPolicyModal from '../components/modals/PrivacyPolicyModal'
import AuthLayout from '../components/layouts/AuthLayout'
import NewHostFields from '../components/newHost/newHostFields'
import {
    Box,
    Container,
    Flex,
    useDisclosure,
} from '@chakra-ui/react'


const NewHost: NextPage = () => {
    const [organization, setOrg] = useState("")
    const [website, setWebsite] = useState("")
    const [phone, setPhone] = useState("")
    const [phoneType, setPhoneType] = useState("")
    const [address1, setAddress1] = useState("")
    const [address2, setAddress2] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zipcode, setZipcode] = useState("")
    const [country, setCountry] = useState("")
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
                position="absolute"
                w="100%"
                h="100vh"
                minW="md"
                bgGradient="linear-gradient(#735FED, #FFFFFF) repeat"
            >
                <AuthLayout>
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
                                                organization={organization}
                                                onOrgChange={setOrg}
                                                website={website}
                                                onWebsiteChange={setWebsite}
                                                phone={phone}
                                                onPhoneChange={setPhone}
                                                phoneType={phoneType}
                                                onPhoneTypeChange={setPhoneType}
                                                address1={address1}
                                                onAddress1Change={setAddress1}
                                                address2={address2}
                                                onAddress2Change={setAddress2}
                                                city={city}
                                                onCityChange={setCity}
                                                state={state}
                                                onStatechange={setState}
                                                zipcode={zipcode}
                                                onZipcodeChange={setZipcode}
                                                country={country}
                                                onCountryChange={setCountry}
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
                </AuthLayout>
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
    // already signed in, redirect
    return {
        // redirect: {
        //     destination: "/",
        // },
        props: {},
    }
}

export default NewHost 
