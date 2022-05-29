import NextLink from 'next/link'
import { signIn } from 'next-auth/react'
import { FaGoogle } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import {
    Button,
    Checkbox,
    Divider,
    FormControl,
    HStack,
    Link as ChakraLink,
    Input,
    Text,
    Stack,
    Select,
    Center,
    Popover,
    PopoverAnchor,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    VStack,
    useDisclosure
} from '@chakra-ui/react'
import CurloButton from '../buttons/CurloButton'

interface SignupFieldsProps {
    email: string;
    onEmailChange: (email: string) => void;
    isHost: boolean;
    onIsHostChange: () => void;
    hostAccountDisclosure: ReturnType<typeof useDisclosure>;
    onOpenPrivacyPolicy: () => void;
    onOpenTermsOfService: () => void;
}

export default function SignupFields(props: SignupFieldsProps) {
    const {
        email,
        onEmailChange,
        isHost,
        onIsHostChange,
        onOpenPrivacyPolicy,
        onOpenTermsOfService,
        hostAccountDisclosure,
    } = props
    const { onOpen: onPopoverOpen, onClose: onPopoverClose, isOpen: isPopoverOpen } = hostAccountDisclosure
    const helperTextFontSize = "12"
    return (

        <VStack alignItems="start" spacing="4" verticalAlign="center">
            <Text fontSize='3xl' text-align="center">
                Sign up
            </Text>
            <FormControl>
                <Stack>
                    <Input
                        borderRadius="full"
                        focusBorderColor="green.400"
                        shadow="sm"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => onEmailChange(e.target.value)}
                    />
                </Stack>
            </FormControl>
            <CurloButton
                buttonText="Sign up with Email"
                color="primary.green"
                isFullWidth={true}
                onClick={() => signIn("email", { email })}
                leftIcon={<HiOutlineMail />}
            />
            <Divider orientation="horizontal" mt={2} width="100%" />
            <CurloButton
                buttonText="Sign up with Google"
                color="primary.green"
                isFullWidth={true}
                onClick={() => signIn("google")}
                leftIcon={<FaGoogle />}
            />
            <VStack w="100%" spacing="1">

                <Text fontSize={helperTextFontSize}>
                    Already have an account?{" "}
                    <NextLink href="/login" passHref>
                        <ChakraLink textColor="primary.black" ><b>Login</b></ChakraLink>
                    </NextLink>
                </Text>
                <Text fontSize={helperTextFontSize}>
                    <Button textColor="primary.black" variant="link" size={helperTextFontSize} onClick={onOpenTermsOfService}>
                        Terms of Service
                    </Button>
                    {" "}and{" "}
                    <Button textColor="primary.black" variant="link" size={helperTextFontSize} onClick={onOpenPrivacyPolicy}>
                        Privacy Policy
                    </Button>
                </Text>
            </VStack>
        </VStack>
    )
}

interface HostAccountPopoverProps {
    h?: number | string
    isOpen?: boolean
    onOpen?: () => void
    onClose?: () => void
}

function HostAccountPopover(props: HostAccountPopoverProps) {
    const { h, isOpen = false, onOpen = (() => { }), onClose = (() => { }) } = props
    return (
        <Popover
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
        >
            <PopoverAnchor>
                <Text>{" "}</Text>
            </PopoverAnchor>
            <PopoverContent w="sm" borderRadius={16} border="none" h={h} bg="primary.green">
                <PopoverHeader>
                    Host Account
                </PopoverHeader>
                <PopoverCloseButton my={1} />
                <PopoverBody>
                    <HostAccountHint />
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

function HostAccountHint() {
    return (
        <Text textColor="black" textAlign="center">
            Host accounts are for curling locations.
            If you want to join a curling team, uncheck to create a regular account.
        </Text>
    )
}

