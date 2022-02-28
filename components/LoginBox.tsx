import { Box, BoxProps } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import { Divider } from "@chakra-ui/react"
import { Input } from "@chakra-ui/react"
import { InputGroup } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { getCsrfToken } from "next-auth/react"
import { FcGoogle } from 'react-icons/fc'
import {useState, ChangeEvent} from 'react'
import { setValues } from "framer-motion/types/render/utils/setters"

export default function LoginBox() {
    const [email, setEmail] = useState('')
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)
    const loginRegular = () => {console.log(email)}
    const loginGoogle = () => {console.log(email + " with google")}

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
                 overflow='auto'
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
                            variant="outline"
                            colorScheme="white"
                            borderColor={'#C4C4C4'}
                            mt={2}
                            isRequired={true}
                            fontSize="sm"
                            type="email"
                            placeholder="email address"
                            _placeholder={{color: 'black'}}
                            errorBorderColor="red.500"
                            onChange={handleChange}
                        />
                    </InputGroup>
                    <Button
                        mt={2}
                        width="100%"
                        color='#C4C4C4'
                        textColor={"#000000"}
                        variant="solid"
                        onClick={loginRegular}
                        overflow='clip'
                        display='block'
                        textOverflow='ellipsis'
                    >
                        Login with email
                    </Button>
                    <Button
                        mt={2}
                        width="100%"
                        color='#C4C4C4'
                        textColor={"#000000"}
                        rightIcon={<FcGoogle/>}
                        onClick={loginGoogle}
                        overflow='clip'
                        display='block'
                        textOverflow='ellipsis'              >
                        Login with Google
                    </Button>
                    <Text>
                        {"Don't have an account? "}
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
                        {" and "}
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
