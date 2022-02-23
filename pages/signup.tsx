import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { getSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import {
<<<<<<< HEAD
  Box,
  Button,
  CloseButton,
  Checkbox,
  Container,
  Divider,
  Flex,
  FormControl,
  HStack,
  Link as ChakraLink,
  Input,
  Text,
  Popover,
  PopoverAnchor,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
=======
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    Flex,
    FormControl,
    HStack,
    Link as ChakraLink,
    Input,
    Text,
    Popover,
    PopoverAnchor,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    VStack,
    useDisclosure,
} from '@chakra-ui/react'

import AuthLayout from '../components/layouts/AuthLayout'
>>>>>>> 2aeb7a7 (Add Popover implementation)

import AuthLayout from "../components/layouts/AuthLayout";
import TermsOfServiceModal from "../components/modals/TermsOfServiceModal";
import PrivacyPolicyModal from "../components/modals/PrivacyPolicyModal";

enum MainField {
  SIGNUP,
  PRIVACY_POLICY,
  TERMS_OF_SERVICE,
}

const Signup: NextPage = () => {
<<<<<<< HEAD
  const [email, setEmail] = useState("");
  const [isHost, setIsHost] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mainField, setMainField] = useState<MainField>(MainField.SIGNUP);
  const signupContainerHeight = "380";
=======
    const [ email, setEmail ] = useState("")
    const [ isHost, setIsHost ] = useState(false)
    const [ mounted, setMounted ] = useState(false)
    const [ mainField, setMainField ] = useState<MainField>(MainField.SIGNUP)
    const hostAccountDisclosure = useDisclosure()
    const {
        isOpen: privacyPolicyIsOpen = false,
        onOpen: privacyPolicyOnOpen,
        onClose: privacyPolicyOnClose,
    } = useDisclosure()
    const {
        isOpen: termsOfServiceIsOpen = false,
        onOpen: termsOfServiceOnOpen,
        onClose: termsOfServiceOnClose,
    } = useDisclosure()
    const signupContainerHeight = "380"
    const popoverHeight = "300"
>>>>>>> 2aeb7a7 (Add Popover implementation)

  useEffect(() => {
    setMounted(true);
  }, []);

<<<<<<< HEAD
  return (
    <>
      <Head>
        <title>Signup | Curlo</title>
      </Head>
      <Box
        w="100%"
        h="100vh"
        minW="sm"
        bgGradient="linear-gradient(#735FED, #FFFFFF) repeat"
      >
        <AuthLayout>
          <Container maxW="2xl">
            {/* Outer box */}
            <Box
              minW="xs"
              h={signupContainerHeight}
              my="4"
              borderRadius="20"
              bg="white"
              shadow="md"
            >
              <Flex flexDirection="row" h="100%">
                {/* Left */}
                <Box
                  display={{ base: "none", sm: "block" }}
                  borderRadius="20"
                  bg="primary.green"
                  h="100%"
                  w="75%"
                ></Box>
                {/* Sign up container (should only run on client side, e.g mounted) */}
                <Box w="100%" h="100%" p="10" borderRadius="32">
                  {mounted &&
                    (mainField === MainField.PRIVACY_POLICY ? (
                      <PrivacyPolicy
                        onClose={() => {
                          setMainField(MainField.SIGNUP);
                        }}
                      />
                    ) : mainField === MainField.TERMS_OF_SERVICE ? (
                      <TermsOfService
                        onClose={() => {
                          setMainField(MainField.SIGNUP);
                        }}
                      />
                    ) : (
                      <SignupFields
                        email={email}
                        onEmailChange={setEmail}
                        isHost={isHost}
                        onIsHostChange={() => setIsHost(!isHost)}
                        onOpenPrivacyPolicy={() => {
                          setMainField(MainField.PRIVACY_POLICY);
                        }}
                        onOpenTermsOfService={() => {
                          setMainField(MainField.TERMS_OF_SERVICE);
                        }}
                      />
                    ))}
                </Box>
              </Flex>
=======
    return (
        <>
            <Head>
                <title>Signup | Curlo</title>
            </Head>
            <Box
                position="absolute"
                w="100%"
                h="100vh"
                minW="md"
                bgGradient="linear-gradient(#735FED, #FFFFFF) repeat"
            >
                <AuthLayout>
                    <Container maxW="2xl">
                        {/* Outer box */}
                        <Box minW="sm" w="100%" h={signupContainerHeight} my="4" borderRadius="20" bg="white" shadow="md">
                            <Flex flexDirection="row" h="100%">
                                {/* Left */}
                                <Box
                                    display={{ base: "none", md: "block" }}
                                    borderRadius="20"
                                    bg="primary.green"
                                    h="100%"
                                    w="100%"
                                >
                                </Box>
                                {/* Sign up container (should only run on client side, e.g mounted) */}
                                <Box minW="sm" w="100%" h="100%" m={2} p={10} borderRadius="32">
                                    {mounted && (
                                        <>
                                            <PrivacyPolicyPopover
                                                isOpen={privacyPolicyIsOpen}
                                                onOpen={privacyPolicyOnOpen}
                                                onClose={privacyPolicyOnClose}
                                                h={popoverHeight}
                                            />
                                            <TermsOfServicePopover
                                                isOpen={termsOfServiceIsOpen}
                                                onOpen={termsOfServiceOnOpen}
                                                onClose={termsOfServiceOnClose}
                                                h={popoverHeight}
                                            />
                                            <HostAccountPopover
                                                isOpen={hostAccountDisclosure.isOpen}
                                                onOpen={hostAccountDisclosure.onOpen}
                                                onClose={hostAccountDisclosure.onClose}
                                            />
                                            <SignupFields
                                                email={email}
                                                onEmailChange={setEmail}
                                                isHost={isHost}
                                                hostAccountDisclosure={hostAccountDisclosure}
                                                onIsHostChange={() => setIsHost(!isHost)}
                                                onOpenPrivacyPolicy={() => { privacyPolicyOnOpen() }}
                                                onOpenTermsOfService={() => { termsOfServiceOnOpen() }}
                                            />
                                        </>
                                    )}
                                </Box>
                            </Flex>
                        </Box>
                    </Container>
                </AuthLayout>
>>>>>>> 2aeb7a7 (Add Popover implementation)
            </Box>
          </Container>
        </AuthLayout>
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session || !session["user"]) {
    // not signed in
    return {
      props: {},
    };
  }
  // already signed in, redirect
  return {
    // redirect: {
    //     destination: "/",
    // },
    props: {},
  };
};

interface SignupFieldsProps {
<<<<<<< HEAD
  email: string;
  onEmailChange: (email: string) => void;
  isHost: boolean;
  onIsHostChange: () => void;
  onOpenPrivacyPolicy: () => void;
  onOpenTermsOfService: () => void;
}

function SignupFields(props: SignupFieldsProps) {
  const {
    email,
    onEmailChange,
    isHost,
    onIsHostChange,
    onOpenPrivacyPolicy,
    onOpenTermsOfService,
  } = props;
  const {
    onOpen: onPopoverOpen,
    onClose: onPopoverClose,
    isOpen: isPopoverOpen,
  } = useDisclosure();
  const helperTextFontSize = "12";
  return (
    <VStack alignItems="start" spacing="4">
      <Text fontSize="3xl">Sign up</Text>
      <FormControl>
        <Input
          borderRadius="full"
          focusBorderColor="green.400"
          shadow="sm"
          placeholder="Email address"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
        />
      </FormControl>
      <Button
        isFullWidth
        bg="primary.green"
        borderRadius="full"
        boxShadow="md"
        _hover={{ bg: "green.400" }}
        _active={{ bg: "green.600" }}
        _focus={{ boxShadow: "lg" }}
        onClick={() => signIn("email", { email })}
      >
        Sign up with email
      </Button>
      <Divider orientation="horizontal" mt={2} width="100%" />
      <Button
        isFullWidth
        bg="primary.green"
        borderRadius="full"
        boxShadow="md"
        _hover={{ bg: "green.400" }}
        _active={{ bg: "green.600" }}
        _focus={{ boxShadow: "lg" }}
        onClick={() => signIn("google")}
      >
        Sign up with Google
      </Button>
      <VStack w="100%" spacing="1">
        <HStack align="center">
          <Popover
            isOpen={isPopoverOpen}
            onOpen={onPopoverOpen}
            onClose={onPopoverClose}
            placement="top"
          >
            <PopoverAnchor>
              <Text fontSize={helperTextFontSize}>Host account?</Text>
            </PopoverAnchor>
            <Checkbox
              aria-label="Host account"
              size="sm"
              borderRadius="50%"
              colorScheme="teal"
              checked={isHost}
              css={`
                > span:first-of-type {
                  box-shadow: unset;
                }
              `}
              onChange={() => {
                if (!isHost) onPopoverOpen();
                onIsHostChange();
              }}
            />
            <PopoverContent
              p={4}
              maxW="sm"
              borderRadius={20}
              border="none"
              bg="primary.green"
            >
              <PopoverCloseButton my={1} />
              <PopoverBody>
                <HostAccountHint />
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </HStack>
        <Text fontSize={helperTextFontSize}>
          Already have an account?{" "}
          <NextLink href="/login" passHref>
            <ChakraLink>Login</ChakraLink>
          </NextLink>
        </Text>
        <Text fontSize={helperTextFontSize}>
          <Button
            variant="link"
            size={helperTextFontSize}
            onClick={onOpenTermsOfService}
          >
            Terms of Service
          </Button>{" "}
          and{" "}
          <Button
            variant="link"
            size={helperTextFontSize}
            onClick={onOpenPrivacyPolicy}
          >
            Privacy Policy
          </Button>
        </Text>
      </VStack>
    </VStack>
  );
}

interface TermsOfServiceProps {
  onClose?: () => void;
}

function TermsOfService(props: TermsOfServiceProps) {
  // TODO: Placeholder
  const { onClose } = props;
  return (
    <Box h="100%" w="100%" bg="primary.pruple">
      <CloseButton size="sm" onClick={onClose || (() => {})} />
    </Box>
  );
}

interface PrivacyPolicyProps {
  onClose?: () => void;
}

function PrivacyPolicy(props: PrivacyPolicyProps) {
  // TODO: Placeholder
  const { onClose } = props;
  return (
    <Box h="100%" w="100%" bg="primary.pruple">
      <CloseButton size="sm" onClick={onClose || (() => {})} />
    </Box>
  );
=======
    email: string;
    onEmailChange: (email: string) => void;
    isHost: boolean;
    onIsHostChange: () => void;
    hostAccountDisclosure?: ReturnType<typeof useDisclosure>;
    onOpenPrivacyPolicy: () => void;
    onOpenTermsOfService: () => void;
}

function SignupFields(props: SignupFieldsProps) {
    const {
        email,
        onEmailChange,
        isHost,
        onIsHostChange,
        onOpenPrivacyPolicy,
        onOpenTermsOfService,
        hostAccountDisclosure,
    } = props
    const haDisclosure = hostAccountDisclosure || useDisclosure()
    const { onOpen: onPopoverOpen, onClose: onPopoverClose, isOpen: isPopoverOpen } = haDisclosure
    const helperTextFontSize = "12"
    return (
        <VStack alignItems="start" spacing="4">
            <Text fontSize="3xl">Sign up</Text>
            <FormControl>
                <Input
                    borderRadius="full"
                    focusBorderColor="green.400"
                    shadow="sm"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => onEmailChange(e.target.value)}
                />
            </FormControl>
            <Button
                isFullWidth
                bg="primary.green"
                borderRadius="full"
                boxShadow="md"
                _hover={{ bg: "green.400" }}
                _active={{ bg: "green.600" }}
                _focus={{ boxShadow: "lg" }}
                onClick={() => signIn("email", { email })}
            >
                Sign up with email
            </Button>
            <Divider orientation="horizontal" mt={2} width="100%" />
            <Button
                isFullWidth
                bg="primary.green"
                borderRadius="full"
                boxShadow="md"
                _hover={{ bg: "green.400" }}
                _active={{ bg: "green.600" }}
                _focus={{ boxShadow: "lg" }}
                onClick={() => signIn("google")}
            >
                Sign up with Google
            </Button>
            <VStack w="100%" spacing="1">
                <HStack align="center">
                    <Text fontSize={helperTextFontSize}>Host account?</Text>
                    <Checkbox
                        aria-label="Host account"
                        size="sm"
                        borderRadius="50%"
                        colorScheme="teal"
                        checked={isHost}
                        css={`
                            > span:first-of-type {
                                box-shadow: unset;
                            }
                        `}
                        onChange={() => {
                            if (!isHost) onPopoverOpen()
                            onIsHostChange()
                        }}
                    />
                </HStack>
                <Text fontSize={helperTextFontSize}>
                    Already have an account?{" "}
                    <NextLink href="/login" passHref>
                        <ChakraLink>Login</ChakraLink>
                    </NextLink>
                </Text>
                <Text fontSize={helperTextFontSize}>
                    <Button variant="link" size={helperTextFontSize} onClick={onOpenTermsOfService}>
                        Terms of Service
                    </Button>
                    {" "}and{" "}
                    <Button variant="link" size={helperTextFontSize} onClick={onOpenPrivacyPolicy}>
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
    const { h, isOpen=false, onOpen=(()=>{}), onClose=(()=>{}) } = props
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

interface TermsOfServicePopoverProps {
    h?: number | string
    isOpen?: boolean
    onOpen?: () => void
    onClose?: () => void
}

function TermsOfServicePopover(props: TermsOfServicePopoverProps) {
    const { h, isOpen=false, onOpen=(()=>{}), onClose=(()=>{}) } = props
    return (
        <Popover
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
        >
            <PopoverAnchor>
                <Text>{" "}</Text>
            </PopoverAnchor>
            <PopoverContent w="sm" borderRadius={16} h={h} border="none" bg="primary.green">
                <PopoverHeader>
                    Terms of Service
                </PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                    <TermsOfService />
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

function TermsOfService() {
    // TODO: Placeholder
    return (
        <Box overflowY="scroll" maxH="240" textColor="black" fontSize="12">
            <Text>
                Terms of service placeholder
            </Text>
        </Box>
    )
}

interface PrivacyPolicyPopoverProps {
    h?: number | string
    isOpen?: boolean
    onOpen?: () => void
    onClose?: () => void
}

function PrivacyPolicyPopover(props: PrivacyPolicyPopoverProps) {
    const { h, isOpen=false, onOpen=(()=>{}), onClose=(()=>{}) } = props
    return (
        <Popover
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
        >
            <PopoverAnchor>
                <Text>{" "}</Text>
            </PopoverAnchor>
            <PopoverContent w="sm" maxW="sm" borderRadius={16} h={h} border="none" bg="primary.green">
                <PopoverHeader>
                    Privacy Policy
                </PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                    <PrivacyPolicy />
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

function PrivacyPolicy() {
    // TODO: Placeholder
    return (
        <Box overflowY="scroll" maxH="240" textColor="black" fontSize="12">
            <Text>
                We value your privacy and strive to protect your personal information.
                Please read this Policy to understand what types of information we collect from you, 
                for what purposes and what choices you have regarding our collection of your information.
            </Text>
            <Text>
                This policy covers the Curlo website. By accessing, using or posting information 
                to this Website, you agree to this Privacy Policy.
            </Text>
            <Text>
                We collect several types of information from and about you, including:
            </Text>
            <Text>
                1. Your email address and password. We treat this information as "Personally 
                Identifiable Information" or "PII". We never store passwords in plain text format, 
                only secure password hashes.
            </Text>
            <Text>
                2. Non-personally identifiable information, such as demographic information about you,
                information about your computer system or device, your preferences, your online activity,
                and your location information ("Non-Personally Identifiable Information" a "Non-PII").
                Non-PII, by itself, does not identify you, but it can be combined with other information 
                in a way that allows you to be identified. If this happens, we will treat the combined 
                information as PII.
            </Text>
            <Text>
                3. Specific to users of Curlo, we (optionally) collect personal information such as your gender, 
                data of birth, and other information required for computation, analysis and display of Curlo ratings.
            </Text>
            <Text>
                We may collect information from or about you in the following ways:
            </Text>
            <Text>
                Information Provided by You. We collect information provided by you when you create 
                your profile or use Curlo services.
            </Text>
            <Text>
                We do not sell, rent, or lease any of your personal information to third parties 
                without your explicit consent.
            </Text>
        </Box>
    )
>>>>>>> 2aeb7a7 (Add Popover implementation)
}

function HostAccountHint() {
  return (
    <Text textColor="black" textAlign="center">
      Host accounts are for curling locations. If you want to join a curling
      team, uncheck to create a regular account.
    </Text>
  );
}

export default Signup;
