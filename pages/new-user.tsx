import {
    VStack,
    HStack,
    Box,
    ButtonGroup,
    Center
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import AuthLayout from '../components/layouts/AuthLayout'
import SignupLayout from '../components/layouts/signup/SignupLayout'
import VerticalSpacing from '../components/layouts/signup/VerticalSpacing'
import HorizontalSpacing from '../components/layouts/signup/HorizontalSpacing'
import TextField from '../components/inputs/signup/TextField'
import ToggleButton from '../components/inputs/signup/ToggleButton'
import ClubDropDown from '../components/inputs/signup/ClubDropdown'
import CheckBoxButton from '../components/inputs/signup/CheckBoxButton'
import PrivacyPolicyModal from '../components/modals/PrivacyPolicyModal'
import TermsOfServiceModal from '../components/modals/TermsOfServiceModal'
import CreateAccountButton from '../components/inputs/signup/CreateAccountButton'
import theme from '../themes/colors'



const NewUser: NextPage = () => {
    // where we store the state
    return (
        <>
            <Head>
                <title>Signup User | Curlo</title>
            </Head>
            <div style={{
                background: "linear-gradient(" + theme.colors.primary.purple + ", " + theme.colors.primary.white + ")",
                height: "100vh",
                width: '100%'
            }}>
                <AuthLayout>
                    <SignupLayout>
                        <VerticalSpacing>
                            <HorizontalSpacing>
                                <TextField fieldPlaceholder='First Name' width='185px' />
                                <TextField fieldPlaceholder='Last Name' width='185px' />
                            </HorizontalSpacing>
                            <HorizontalSpacing>
                                <TextField fieldPlaceholder='Date of Birth' width='185px' />
                                <Box
                                    width="185px"
                                    height="62px"
                                    fontSize="20px"
                                    //fontFamily="Roboto"
                                    fontWeight="bold"
                                    color={theme.colors.primary.black}
                                    textAlign="center"
                                >
                                    You qualify for age based teams
                                </Box>
                            </HorizontalSpacing>
                            <ButtonGroup>
                                <HorizontalSpacing>
                                    {/* <ToggleButton buttonText='Male' />
                                    <ToggleButton buttonText='Female' />
                                    <ToggleButton buttonText='N/A' /> */}
                                    <ToggleButton />
                                </HorizontalSpacing>
                            </ButtonGroup>
                            <Center>
                                <VStack height="82px">
                                    <ClubDropDown dropDownText='Club' />
                                    <Box
                                        width="195px"
                                        fontWeight="bold"
                                        fontSize="12px"
                                        textAlign="center"
                                    >
                                        Why do we need this information?
                                    </Box>
                                </VStack>
                            </Center>
                            <VStack spacing="25px">
                                <HStack
                                    spacing="10px"
                                    height="24px"
                                >
                                    <CheckBoxButton />
                                    <Box
                                        width="340px"
                                        height="24px"
                                        fontSize="15px"
                                    >
                                        I agree to the <span style={{ fontWeight: "bold" }}>Terms of Service</span> and <span style={{ fontWeight: "bold" }}>Privacy Policy</span>
                                    </Box>
                                </HStack>
                                <CreateAccountButton />
                            </VStack>
                        </VerticalSpacing>
                    </SignupLayout>
                </AuthLayout>
            </div>
        </>
    )
}

export default NewUser
