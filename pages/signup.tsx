import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { getSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import {
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

import AuthLayout from "../components/layouts/AuthLayout";
import TermsOfServiceModal from "../components/modals/TermsOfServiceModal";
import PrivacyPolicyModal from "../components/modals/PrivacyPolicyModal";

enum MainField {
  SIGNUP,
  PRIVACY_POLICY,
  TERMS_OF_SERVICE,
}

const Signup: NextPage = () => {
  const [email, setEmail] = useState("");
  const [isHost, setIsHost] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mainField, setMainField] = useState<MainField>(MainField.SIGNUP);
  const signupContainerHeight = "380";

  useEffect(() => {
    setMounted(true);
  }, []);

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
