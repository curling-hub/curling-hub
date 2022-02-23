import { Box, BoxProps } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import { Divider } from "@chakra-ui/react"
import { Input } from "@chakra-ui/react"
import { InputGroup } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { getCsrfToken } from "next-auth/react"

interface CustomBoxProps extends BoxProps {}

interface LoginBoxProps extends CustomBoxProps {
    email: string;
    password: string;
    onEmailChange?: (_: string) => void;
    onPasswordChange?: (_: string) => void;
}

export default function LoginBox(props: LoginBoxProps) {
    const { email, password, onEmailChange, onPasswordChange } = props

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            width={{ base: "100%", sm: "sm", md: 400 }}
            boxShadow={1}
            borderRadius={5}
            py={4}
            px={{ base: 4, md: 8 }}
        >
            <Text fontSize="4xl">
                Login
            </Text>
            <InputGroup display="flex" flexDirection="column">
                <Input
                    mt={2}
                    isRequired={true}
                    fontSize="sm"
                    type="email"
                    value={email}
                    placeholder="Email"
                    errorBorderColor="red.500"
                    onChange={(e) => { onEmailChange?.(e.target.value) }}
                />
                <Input
                    mt={2}
                    isRequired={true}
                    fontSize="sm"
                    type="password"
                    placeholder="Password"
                    value={password}
                    errorBorderColor="red.500"
                    onChange={(e) => { onPasswordChange?.(e.target.value) }}
                />
            </InputGroup>
            <Button
                mt={2}
                width="100%"
                colorScheme="green"
                variant="solid"
                onClick={() => { console.log(email) }}
            >
                Sign in
            </Button>
            <Divider orientation="horizontal" mt={2} width="100%" />
            <Button
                mt={2}
                width="100%"
                variant="outline"
                onClick={() => { console.log("Sign up") }}
            >
                Sign up
            </Button>
        </Box>
    )
}
