import { Box, HStack } from "@chakra-ui/react";
import TermsOfServiceButton from '../../inputs/signup/TermsOfServiceButton'
import PrivacyPolicyButton from '../../inputs/signup/PrivacyPolicyButton'

interface TermsAndPolicyProps {
    termsOnOpen: () => void;
    policyOnOpen: () => void;
}

export default function TermsAndPolicy(props: TermsAndPolicyProps) {

    return (
        <>
            <HStack>
                <Box height="24px" fontSize="15px">
                    I agree to the
                </Box>
                <TermsOfServiceButton onOpen={props.termsOnOpen} />
                <Box height="24px" fontSize="15px">
                    and
                </Box>
                <PrivacyPolicyButton onOpen={props.policyOnOpen} />
            </HStack>
        </>
    )
}