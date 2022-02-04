import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { green } from '@mui/material/colors'
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles'

import style from '../styles/Login.module.css'
import LoginBox from '../components/LoginBox'

const theme: Theme = createTheme({
    palette: {
        secondary: {
            main: green[400],
            contrastText: '#fff',
        },
    },
})

const Login: NextPage = () => {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ showPassword, setShowPassword ] = useState(false)
    return (
        <ThemeProvider theme={theme}>
            <div className={style.container}>
                <Head>
                    <title>Login - Curling Hub</title>
                    <meta name="description" content="Login to Curling Hub" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <div className={style.main}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        my: 10,
                    }}>
                        <Box sx={{
                            display: { xs: "none", md: "flex" },
                            width: "50%",
                            alignItems: "center",
                            mr: 10,
                        }}>
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                <Typography variant="h3" sx={{ color: green[400] }}>
                                    Curling Hub
                                </Typography>
                                <Typography variant="body1">
                                    Connect and compete with curlers around you
                                </Typography>
                            </Box>
                        </Box>
                        <LoginBox
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                width: { xs: "100%", md: 400 },
                                flexDirection: "column",
                                boxShadow: 1,
                                borderRadius: 5,
                                py: 4,
                                px: { xs: 4, md: 8 },
                            }}
                            email={email}
                            password={password}
                            showPassword={showPassword}
                            onEmailChange={(s) => {setEmail(s)}}
                            onPasswordChange={(s) => {setPassword(s)}}
                            onShowPasswordChange={(s) => {setShowPassword(s)}}
                        />
                    </Box>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default Login
