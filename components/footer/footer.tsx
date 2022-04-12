import {
    Box,
    Container,
    Stack,
    Text,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react';
import TosAndPolicy from './TosandPolicy';
import TermsOfServiceModal from '../modals/TermsOfServiceModal'
import PrivacyPolicyModal from '../modals/PrivacyPolicyModal'
import { useEffect, useState } from 'react'


/*
interface TermsAndPolicyProps {
    termsOnOpen: () => void;
    policyOnOpen: () => void;
}
props: TermsAndPolicyProps
*/
export default function Footer() {
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


    const onTermsOfServiceOpen = () => {
        termsOfServiceOnOpen()
    }
    const onPrivacyPolicyOpen = () => {
        privacyPolicyOnOpen()
    }

    const [mounted, setMounted] = useState(false)
    useEffect(() => { setMounted(true) }, [])
    return (

        <Box
            pos="absolute"
            bottom="0"
            h="4rem"
            color={useColorModeValue('gray.700', 'gray.200')}>
            <Container
                // paddingTop="2.5rem"
                // marginTop="1rem"
                // marginBottom="5px"
                // py={{ base: '2', md: '5' }}
                // pos="absolute"
                // bottom="0"
                left="0"
                as={Stack}
                maxW="100%"
                py={4}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}
            >
                <Stack direction={'row'} spacing={6} paddingTop="20px">
                    <Text > &copy; {new Date().getFullYear()} Curlo</Text>
                    <TermsOfServiceModal
                        isOpen={termsOfServiceIsOpen}
                        onClose={termsOfServiceOnClose}
                    />
                    <PrivacyPolicyModal
                        isOpen={privacyPolicyIsOpen}
                        onClose={privacyPolicyOnClose}
                    />
                    <TosAndPolicy
                        termsOnOpen={onTermsOfServiceOpen}
                        policyOnOpen={onPrivacyPolicyOpen}
                    />
                </Stack>
            </Container>
        </Box >
    );
}

