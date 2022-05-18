import type { NextPage } from 'next'
import Head from 'next/head'
import AuthLayout from '../components/layouts/AuthLayout'
import Footer from "../components/footer/footer";
import RequestModal from '../components/modals/RequestModal'
import {
    Box, Text, Image, Button, useDisclosure, VStack
} from '@chakra-ui/react'
import React, { useState } from 'react'
const linkTextSize = "12"



const Request: NextPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [size, setSize] = useState('sm')

    const handleSizeClick = (newSize: React.SetStateAction<string>) => {//You can ignore the newSize error/warning, for now?
        setSize(newSize)
        onOpen()
    }

    const sizes = ['xl']
    return (
        <>
            <Head>
                <title>Request | Curlo</title>
            </Head>
            <Box
                position="relative"
                w="100%"
                minH="100vh"
                bgGradient="linear-gradient(primary.purple, primary.white)"
            >
                <AuthLayout />
                <Box paddingBottom="4rem">

                    <Box
                        alignItems='center'
                        width={{ base: "300px", md: "400px", lg: "400px" }}
                        height={{ base: "300px", md: "400px", lg: "400px" }}
                        background="primary.green"
                        borderRadius="35px"
                        marginBottom={{ base: '50%', md: '30%', lg: '28%' }}
                    >
                        <VStack spacing="3" marginTop="8%">
                            <Text
                                fontSize="20px"
                                textAlign='center'
                                fontWeight='bold'
                                padding="6% 6% 0% 6%">
                                We are processing your <br></br>
                                request. Expect to hear <br></br>
                                from us as we verify <br></br>
                                your account.
                            </Text>

                            <Image src="/curloLogo2.svg"
                                alt="Curlo logo"
                                width={{ base: '70px', md: '100px', lg: '120x' }}
                                height={{ base: '70px', md: '100px', lg: '120px' }}
                                marginLeft='40%' />
                            {/*//Image End */}

                            <Text fontSize={linkTextSize}>
                                <Button variant="link" size={linkTextSize} onClick={onOpen}>
                                    What is account verification?
                                </Button>
                            </Text>
                            <RequestModal
                                isOpen={isOpen}
                                onClose={onClose}
                            />

                        </VStack>
                    </Box>
                </Box>
                <Footer />
            </Box>
        </>
    )
}

export default Request