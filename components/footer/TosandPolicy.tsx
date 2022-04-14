import TermsOfServiceButton from "../inputs/signup/TermsOfServiceButton";
import PrivacyPolicyButton from '../inputs/signup/PrivacyPolicyButton'

interface TermsAndPolicyProps {
    termsOnOpen: () => void;
    policyOnOpen: () => void;
}

export default function TosAndPolicy(props: TermsAndPolicyProps) {

    return (
        <>
            <TermsOfServiceButton onOpen={props.termsOnOpen} />
            <PrivacyPolicyButton onOpen={props.policyOnOpen} />
        </>
    )
}