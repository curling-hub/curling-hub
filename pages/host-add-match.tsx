import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
// import React, { Component, Fragment } from 'react'
import TermsOfServiceModal from '../components/modals/TermsOfServiceModal'
import PrivacyPolicyModal from '../components/modals/PrivacyPolicyModal'
import AuthLayout from '../components/layouts/AuthLayout'
import NewHostFields from '../components/newHost/newHostFields'
import Footer from "../components/footer/footer";
import {
    Text,
    Box,
    Container,
    Flex,
    useDisclosure,
    Radio,
    RadioGroup,
    Input,
   // Textarea 

} from '@chakra-ui/react'

const HostAddMatch: NextPage = () => {
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
    return( 
    <>
        <Head>
            <title>Host Add Match | Curlo</title>
        </Head>

        <Box
                position="relative"
                w="100%"
                minH="100vh"
                minW="md"
                bgGradient="linear-gradient(#735FED, #FFFFFF) repeat"
        >
            <AuthLayout/>
            <Box
               // alignItems={"center"}
                bg="primary.white"
                h="750px"
                w="90%"
                marginLeft = "5%"
                borderRadius="35px"
                >
                    <Text
                    textAlign={"center"}
                    paddingTop= '2%'
                    fontSize = '50px'
                    fontWeight = 'bold'
                    >Add Match</Text>
     {/*           <Input 
                />
                Date
                <RadioGroup
                marginLeft = '4%'
                >
                    <Radio>Win</Radio>
                    <Radio>Lose</Radio>
                    <Radio>Tie</Radio>
                </RadioGroup> */}
                



            </Box>
 
        </Box>

        

     </>
    )
}

export default HostAddMatch