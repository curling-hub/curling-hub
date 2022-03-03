
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import NextLink from 'next/link'
import { getSession, signIn } from 'next-auth/react'
import { useEffect, useState } from 'react'
import React, { Component, Fragment } from 'react'
import TermsOfServiceModal from '../components/modals/TermsOfServiceModal'
import PrivacyPolicyModal from '../components/modals/PrivacyPolicyModal'
import StateDropdown from '../components/signupComponents/StateDropdown'
import AuthLayout from '../components/layouts/AuthLayout'
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
    Stack,
    VStack,
    useDisclosure,
    Select,
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
    const signupContainerHeight = "530"
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

interface NewHostFieldsProps {
    organization: string;
    onOrgChange: (Organization: string) => void;
    website: string;
    onWebsiteChange: (website: string) => void;
    phone: string;
    onPhoneChange: (Phone: string) => void;
    phoneType: string;
    onPhoneTypeChange: (phoneType: string) => void
    address1: string;
    onAddress1Change: (address1: string) => void;
    address2: string;
    onAddress2Change: (address2: string) => void;
    city: string;
    onCityChange: (city: string) => void;
    state: string;
    onStatechange: (state: string) => void;
    zipcode: string;
    onZipcodeChange: (zipcode: string) => void;
    country: string;
    onCountryChange: (country: string) => void;
    isAgreedPP: boolean;
    onIsAgreedPPChange: () => void;
    onOpenPrivacyPolicy: () => void;
    onOpenTermsOfService: () => void;
}

function SignupFields(props: NewHostFieldsProps) {
    const {
        organization,
        onOrgChange,
        website,
        onWebsiteChange,
        phone,
        onPhoneChange,
        phoneType,
        onPhoneTypeChange,
        address1,
        onAddress1Change,
        address2,
        onAddress2Change,
        city,
        onCityChange,
        state,
        onStatechange,
        zipcode,
        onZipcodeChange,
        country,
        onCountryChange,
        isAgreedPP,
        onIsAgreedPPChange,
        onOpenPrivacyPolicy,
        onOpenTermsOfService,
    } = props

    const helperTextFontSize = "12"
    return (
        <VStack alignItems="start" spacing="4">
            <FormControl>
                <Stack>
                    <Input
                        borderRadius="full"
                        focusBorderColor="green.400"
                        shadow="sm"
                        placeholder="Organization"
                        value={organization}
                        onChange={(e) => onOrgChange(e.target.value)}
                    />
                    <Input
                        borderRadius="full"
                        focusBorderColor="green.400"
                        shadow="sm"
                        placeholder="Website"
                        value={website}
                        onChange={(e) => onWebsiteChange(e.target.value)}
                    />
                    <HStack>
                        <Input
                            // width=".75"
                            type="phone"
                            borderRadius="full"
                            focusBorderColor="green.400"
                            shadow="sm"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => onPhoneChange(e.target.value)}
                        />
                        <Select
                            // width=".5"
                            borderRadius="full"
                            placeholder='Phone'>
                            <option value={phoneType}>Home</option>
                            <option value={phoneType}>Mobile</option>
                            <option value={phoneType}>Business</option>
                        </Select>
                    </HStack>
                    <Input
                        borderRadius="full"
                        focusBorderColor="green.400"
                        shadow="sm"
                        placeholder="Street Address"
                        value={address1}
                        onChange={(e) => onAddress1Change(e.target.value)}
                    />
                    <Input
                        borderRadius="full"
                        focusBorderColor="green.400"
                        shadow="sm"
                        placeholder="Apt., Suite, Unit, etc."
                        value={address2}
                        onChange={(e) => onAddress2Change(e.target.value)}
                    />
                    <HStack>
                        <Input
                            borderRadius="full"
                            focusBorderColor="green.400"
                            shadow="sm"
                            placeholder="City"
                            value={city}
                            onChange={(e) => onCityChange(e.target.value)}

                        />
                        <StateDropdown />
                    </HStack>
                    <HStack>
                        <Input
                            borderRadius="full"
                            focusBorderColor="green.400"
                            shadow="sm"
                            placeholder="Zipcode"
                            value={zipcode}
                            onChange={(e) => onZipcodeChange(e.target.value)}
                        />
                        <Select
                            borderRadius="full"
                            placeholder='Country'>
                            <option value='USA'>USA</option>
                        </Select>
                    </HStack>
                </Stack>
            </FormControl>
            <Button
                isFullWidth
                bg="primary.green"
                borderRadius="full"
                boxShadow="md"
                _hover={{ bg: "green.400" }}
                _active={{ bg: "green.600" }}
                _focus={{ boxShadow: "lg" }}
                onClick={() => signIn("Organization", { organization })}//TODO this needs to be changed
            >
                Request Account
            </Button>
            <Divider orientation="horizontal" mt={2} width="100%" />

            <VStack w="100%" spacing="1">

                <Text fontSize={helperTextFontSize}>
                    Already have an account?{" "}
                    <NextLink href="/login" passHref>
                        <ChakraLink>Login</ChakraLink>
                    </NextLink>
                </Text>
                <Text fontSize={helperTextFontSize}>
                    <Checkbox
                        aria-label=""
                        size="sm"
                        borderRadius="50%"
                        colorScheme="teal"
                        checked={isAgreedPP}
                        css={`
                            > span:first-of-type {
                                box-shadow: unset;
                            }
                        `}
                    />
                    {" "}I agree to the {" "}
                    <Button variant="link" size={helperTextFontSize} onClick={onOpenTermsOfService}>
                        Terms of Service
                    </Button>
                    {" "}and{" "}
                    <Button variant="link" size={helperTextFontSize} onClick={onOpenPrivacyPolicy}>
                        Privacy Policy
                    </Button>
                </Text>
            </VStack>
        </VStack>
    )
}

export default NewHost 
