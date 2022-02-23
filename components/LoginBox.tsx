import { Box, BoxProps } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import { Divider } from "@chakra-ui/react"
import { Input } from "@chakra-ui/react"
import { InputGroup } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { getCsrfToken } from "next-auth/react"
import { FcGoogle } from 'react-icons/fc'

interface CustomBoxProps extends BoxProps {}

interface LoginBoxProps extends CustomBoxProps {
    onEmailChange?: (_: string) => void;
    onPasswordChange?: (_: string) => void;
}

export default function LoginBox(props: LoginBoxProps) {
    const { onEmailChange, onPasswordChange } = props

    return (
        <Box
            width='40%'
            height='50%'
            borderRadius='25px'
            backgroundColor={'white'}
        >
            <Box
                 width='70%'
                 height='100%'
                 backgroundColor={'#7fd6a4'}
                 borderRadius='25px'
                 display="flex"
                 flexDirection="column"
                 alignItems="center"
                 justifyContent='center'
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="left"
                    justifyContent='center'
                    width='60%'
                    height='100%'
                    boxShadow={1}
                    rowGap='5%'
                    py={4}
                    px={{ base: 4, md: 8 }}
                >
                    <Text fontSize="4xl">
                        Log In
                    </Text>
                    <InputGroup display="flex" flexDirection="column">
                        <Input
                            mt={2}
                            isRequired={true}
                            fontSize="sm"
                            type="email"
                            placeholder="Email address"
                            errorBorderColor="red.500"
                            color={"#000000"}
                            onChange={(e) => { onEmailChange?.(e.target.value) }}
                        />
                    </InputGroup>
                    <Button
                        mt={2}
                        width="100%"
                        color='#C4C4C4'
                        textColor={"#000000"}
                        variant="solid"
                        onClick={() => { console.log("log in") }}
                    >
                        Login with email
                    </Button>
                    <Button
                        mt={2}
                        width="100%"
                        color='#C4C4C4'
                        textColor={"#000000"}
                        rightIcon={<FcGoogle/>}
                        onClick={() => { console.log("Sign up") }}
                    >
                        Login with Google
                    </Button>
                    <Text>
                        Don't have an account? 
                        <Button
                            variant='link'
                            color='black'
                        >
                            Sign Up
                        </Button>
                    </Text>
                    <Text>
                        <Button
                            variant='link'
                            color='black'
                        >
                            Terms of service
                        </Button>
                        and
                        <Button
                            variant='link'
                            color='black'
                        >
                            Privacy Policy
                        </Button>
                    </Text>
                </Box>
            </Box>
        </Box>
    )
}
