import type { NextPage } from 'next'
import Head from 'next/head'
import AuthLayout from '../components/layouts/AuthLayout'
import {
    Box, Text, Image, Button, Spacer, Center, useDisclosure
} from '@chakra-ui/react'
import React, { useState } from 'react'

  import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'

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
                    alignItems='center'

                    width="29.3%"
                    height="60%"
                    background="primary.green"
                    borderRadius="35px"
                    marginBottom="10%"
                //    marginLeft='0%'
                    >
                        <Text
                        fontSize="1.9vw"
                        textAlign='center'
                        fontWeight='bold'
                        padding="7%">
                            We are processing your <br></br>
                            request. Expect to hear <br></br>
                            from us as we verify <br></br>
                            your account.
                        </Text>

                        {sizes.map((size) => (
                            <Button 
                                marginLeft='10%'
                                marginBottom='50%'
                                backgroundColor='primary.green'
                                width='80%'
                                h='7.5vw'//Change from vw to % later?
                                alignItems='center'
                        //        onClick={onOpen}
                                onClick={() => handleSizeClick(size)}
                                key={size}

                                >
                                    <Image src="/curloLogo2.svg" 
                                        alt="Curlo logo" 
                                        w="6vw" 
                                        h="6vw" 
                                        marginLeft='80%'
                                        marginBottom='10%'/>
                                    {/*//Image End */}             
                                    <Text
                                        position='relative'//Any better alternative to 'relative'?
                                        top='30%'
                                        right='55%'
                                        fontSize='1.3vw'>
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
                                height='46%'
                                marginTop='8%'
                                borderRadius='35px'
                                fontSize='1.09vw'
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