import NextLink from 'next/link'
import { signIn } from 'next-auth/react'
import { FaGoogle } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import {
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormLabel,
    HStack,
    Link as ChakraLink,
    Input,
    Text,
    Stack,
    VStack,
    Select,
    Center
} from '@chakra-ui/react'

interface LoginFieldsProps {
    email: string;
    onEmailChange: (email: string) => void;
    onOpenPrivacyPolicy: () => void;
    onOpenTermsOfService: () => void;
}

export default function LoginFields(props: LoginFieldsProps) {
    const {
        email,
        onEmailChange,
        onOpenPrivacyPolicy,
        onOpenTermsOfService,
    } = props

    const helperTextFontSize = "12"
    return (

        <VStack alignItems="start" spacing="4" verticalAlign="center">

            <Text fontSize='3xl' text-align="center">
                Log In
            </Text>
            <FormControl>
                <Stack>
                    <FormLabel htmlFor="email" srOnly>Email Address</FormLabel>
                    <Input
                        borderRadius="full"
                        focusBorderColor="green.400"
                        shadow="sm"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => onEmailChange(e.target.value)}
                        id="email"
                    />
                </Stack>
            </FormControl>
            <Button
                leftIcon={<HiOutlineMail />}
                isFullWidth
                bg="primary.white"
                borderRadius="full"
                boxShadow="md"
                _hover={{ bg: "gray.200" }}
                _active={{ bg: "gray.300" }}
                _focus={{ boxShadow: "dark-lg" }}
                onClick={() => signIn("email", { email })}//TODO this needs to be changed
            >
                Login with Email
            </Button>
            <Divider orientation="horizontal" mt={2} width="100%" />
            <Button
                leftIcon={<FaGoogle />}
                isFullWidth
                bg="primary.white"
                borderRadius="full"
                boxShadow="md"
                _hover={{ bg: "gray.200" }}
                _active={{ bg: "gray.300" }}
                _focus={{ boxShadow: "dark-lg" }}
                onClick={() => signIn("google")}//TODO this needs to be changed
            >
                Login with Google
            </Button>

            <VStack w="100%" spacing="1">

                <Text fontSize={helperTextFontSize}>
                    Don't have an account?{" "}
                    <NextLink href="/signup" passHref>
                        <ChakraLink textColor="primary.black" ><b>Sign Up</b></ChakraLink>
                    </NextLink>
                </Text>
                <Text fontSize={helperTextFontSize}>
                    <Button textColor="primary.black" variant="link" size={helperTextFontSize} onClick={onOpenTermsOfService}>
                        <b>Terms of Service</b>
                    </Button>
                    {" "}and{" "}
                    <Button textColor="primary.black" variant="link" size={helperTextFontSize} onClick={onOpenPrivacyPolicy}>
                        <b>Privacy Policy</b>
                    </Button>
                </Text>
            </VStack>
        </VStack>
    )
}

