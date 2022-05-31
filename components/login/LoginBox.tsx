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
import CurloButton from '../buttons/CurloButton'

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
            <CurloButton
                buttonText="Login with Email"
                color="primary.white"
                isFullWidth={true}
                onClick={() => signIn("email", { email })}
                leftIcon={<HiOutlineMail />}
            />
            <Divider orientation="horizontal" mt={2} width="100%" />
            <CurloButton
                buttonText="Login with Google"
                color="primary.white"
                isFullWidth={true}
                onClick={() => signIn("google")}
                leftIcon={<FaGoogle />}
            />
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

