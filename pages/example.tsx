import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import { Box } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"

import style from '../styles/Login.module.css'
import LoginBox from '../components/LoginBox'

const ExampleLogin: NextPage = () => {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    return (
        <div className={style.container}>
            <Head>
                <title>Login - Curling Hub</title>
                <meta name="description" content="Login to Curling Hub" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={style.main}>
                <Box display="flex" flexDirection="row" my={10}>
                    <Box display={{ base: "none", md: "flex" }} width="50%" alignItems="center" mr={10}>
                        <Box display="flex" flexDirection="column">
                            <Text fontSize="5xl" colorScheme="green">
                                Curling Hub
                            </Text>
                            <Text>
                                Connect and compete with curlers around you
                            </Text>
                        </Box>
                    </Box>
                    <LoginBox
                        email={email}
                        password={password}
                        onEmailChange={(s) => {setEmail(s)}}
                        onPasswordChange={(s) => {setPassword(s)}}
                    />
                </Box>
            </div>
        </div>
    )
}

export default ExampleLogin
