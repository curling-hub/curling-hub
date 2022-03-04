import {
    VStack,
    HStack,
    Box,
    ButtonGroup,
    Center,
    useDisclosure
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import AuthLayout from '../components/layouts/AuthLayout'
import PrivacyPolicyModal from '../components/modals/PrivacyPolicyModal'
import TermsOfServiceModal from '../components/modals/TermsOfServiceModal'
import InfoModal from '../components/modals/signup/infoModal'
import SignupLayout from '../components/layouts/signup/SignupLayout'
import VerticalSpacing from '../components/layouts/signup/VerticalSpacing'
import HorizontalSpacing from '../components/layouts/signup/HorizontalSpacing'
import TextField from '../components/inputs/signup/TextField'
import ToggleButtonGroup from '../components/inputs/signup/ToggleButtonGroup'
import ClubDropDown from '../components/inputs/signup/ClubDropdown'
import CheckBoxButton from '../components/inputs/signup/CheckBoxButton'
import TermsAndPolicy from '../components/pageText/signup/TermsAndPolicy'
import CreateAccountButton from '../components/inputs/signup/CreateAccountButton'
import theme from '../themes/colors'
import InfoButton from '../components/inputs/signup/InfoButton'

const NewUser: NextPage = () => {

    const {
        isOpen: termsOfServiceIsOpen = false,
        onOpen: termsOfServiceOnOpen,
        onClose: termsOfServiceOnClose,
    } = useDisclosure()
    const {
        isOpen: privacyPolicyIsOpen = false,
        onOpen: privacyPolicyOnOpen,
        onClose: privacyPolicyOnClose,
    } = useDisclosure()
    const {
        isOpen: infoIsOpen = false,
        onOpen: infoOnOpen,
        onClose: infoOnClose,
    } = useDisclosure()

    const onTermsOfServiceOpen = () => {
        termsOfServiceOnOpen()
    }
    const onPrivacyPolicyOpen = () => {
        privacyPolicyOnOpen()
    }
    const onInfoOpen = () => {
        infoOnOpen()
    }

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
                    <Center>
                        <TermsOfServiceModal
                            isOpen={termsOfServiceIsOpen}
                            onClose={termsOfServiceOnClose}
                        />
                        <PrivacyPolicyModal
                            isOpen={privacyPolicyIsOpen}
                            onClose={privacyPolicyOnClose}
                        />
                        <InfoModal
                            isOpen={infoIsOpen}
                            onClose={infoOnClose}
                        />
                    </Center>
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
                                    <ToggleButtonGroup />
                                </HorizontalSpacing>
                            </ButtonGroup>
                            <Center>
                                <VStack height="82px">
                                    <ClubDropDown dropDownText='Club' />
                                    <InfoButton onOpen={onInfoOpen} />
                                </VStack>
                            </Center>
                            <VStack spacing="25px">
                                <HStack
                                    spacing="10px"
                                    height="24px"
                                >
                                    <CheckBoxButton />
                                    <TermsAndPolicy
                                        termsOnOpen={onTermsOfServiceOpen}
                                        policyOnOpen={onPrivacyPolicyOpen}
                                    />
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
