import type { NextPage } from 'next'
import Head from 'next/head'
import AuthLayout from '../components/layouts/AuthLayout'
import {
    Box, Text, Image, Button, Spacer, Center, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton
} from '@chakra-ui/react'
import React, { useState } from 'react'



const Request: NextPage = () => {
    const{isOpen,onOpen,onClose} = useDisclosure()
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
                 //   alignItems='center'
                    justifyItems='center'
                    minWidth="29.3%"
                    minHeight="60%"
                    background="primary.green"
                    borderRadius="35px"
                    marginBottom="10%"
                //    marginLeft='0%'
                    >
                        <Text
                        fontSize="1.9vw"
                        textAlign='center'
                        fontWeight='bold'
                        padding="7% 7% 0% 7%">
                            We are processing your <br></br>
                            request. Expect to hear <br></br>
                            from us as we verify <br></br>
                            your account.
                        </Text>

                        <Image src="/curloLogo2.svg" 
                                        alt="Curlo logo" 
                                        w="6vw" 
                                        h="6vw" 
                                        marginLeft='40%'/>
                                    {/*//Image End */}     

                        {sizes.map((size) => (
                            <Button 
                                backgroundColor='primary.green'
                                h='80px'
                                justifySelf={'center'}

                                onClick={() => handleSizeClick(size)}
                                key={size}
                                alignContent='center'
                                marginLeft={{base:'0%',lg:'2%', xl:'27%'}}
                                marginBottom='15%'
                                
                              //  marginLeft='17%'
                                //marginBottom = essentially adds padding to the bottom, rather than bring text+button closer to logo.
                                >
       
                                    <Text
                                        fontSize={{base:'1em', md:'1.1em',lg:'1.2em',xl:'1.4em'}}
//                                        fontSize='2em'
                                    >
                                        What is account verification?
                                    </Text>
                            </Button>   
                        ))}
                        <Modal 

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
                                <ModalCloseButton/>
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
                        </Modal> 
                    </Box>
                </AuthLayout>
            </Box>
        </>
    )
}

export default Request