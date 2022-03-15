import type { NextPage } from 'next'
import Head from 'next/head'
import AuthLayout from '../components/layouts/AuthLayout'
import RequestModal from '../components/modals/RequestModal'
import {
    Box, Text, Image, Button, Spacer, Center, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, VStack
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
                position="absolute"
                w="100%"
                h="100vh"
                minW="md"
                bgGradient="linear-gradient(primary.purple, primary.white) repeat"
            >
                <AuthLayout>
                    <Box
                        alignItems='center'
                        // justifyItems='center'
                        // minWidth="29.3%"
                        width={{ base: "300px", md: "400px", lg: "400px" }}
                        // minHeight="60%"
                        height={{ base: "300px", md: "400px", lg: "400px" }}
                        background="primary.green"
                        borderRadius="35px"
                        marginBottom={{ base: '50%', md: '30%', lg: '28%' }}
                    //    marginLeft='0%'
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
                                // w="6vw"
                                // h="6vw"
                                width={{ base: '70px', md: '100px', lg: '120x' }}
                                height={{ base: '70px', md: '100px', lg: '120px' }}
                                marginLeft='40%' />
                            {/*//Image End */}

                            {/* {sizes.map((size) => (
                                <Button
                                    backgroundColor='primary.green'
                                    h='80px'
                                    justifySelf={'center'}

                                    onClick={() => handleSizeClick(size)}
                                    key={size}
                                    alignContent='center'
                                    marginLeft={{ base: '0%', lg: '2%', xl: '27%' }}
                                    marginBottom='15%'

                                //  marginLeft='17%'
                                //marginBottom = essentially adds padding to the bottom, rather than bring text+button closer to logo.
                                >

                                    {/* <Text
                                        fontSize={{ base: '1em', md: '1.1em', lg: '1.2em', xl: '1.4em' }}
                                    //                                        fontSize='2em'
                                    >
                                        What is account verification?
                                    </Text> */}
                            {/* </Button>
                            ))} */}
                            <Text fontSize={linkTextSize}>
                                <Button variant="link" size={linkTextSize} onClick={onOpen}>
                                    What is account verification?
                                </Button>
                            </Text>
                            <RequestModal
                                isOpen={isOpen}
                                onClose={onClose}
                            />
                            {/* <Modal

                                isOpen={isOpen}
                                onClose={onClose}
                                size={size} >
                                <ModalOverlay />

                                <ModalContent
                                    //Can't get my dimensions; always compromising elsewhere.
                                    alignItems='center'
                                    textAlign='center'

                                    width='50%'
                                    height='48%'
                                    marginTop='8%'
                                    borderRadius='35px'
                                    fontSize='1.6em'
                                >
                                    <ModalHeader
                                        fontSize='2vw'>Account Verification</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        At Curlo, club accounts matter. We Verify <br></br>
                                        that every club account that is opened in <br></br>
                                        connected to a real club that has a curling <br></br>
                                        location. We ensure that our club admins <br></br>
                                        are real people that are inputting scores from <br></br>
                                        real games. <b>This process can take up to a <br></br>
                                            week.</b> Expect to hear from us during this <br></br>
                                        verification process as we verify you are <br></br>
                                        an administrator of the club you are <br></br>
                                        registered with.
                                    </ModalBody>

                                </ModalContent>
                            </Modal> */}
                        </VStack>
                    </Box>
                </AuthLayout>
            </Box>
        </>
    )
}

export default Request