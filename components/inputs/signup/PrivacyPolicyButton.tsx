import { Button } from "@chakra-ui/react";

interface PrivacyPolicyButtonProps {
    onOpen: () => void;
}

export default function PrivacyPolicyButton(props: PrivacyPolicyButtonProps) {

    return (
        <>
            <Button
                variant="link"
                fontSize="15px"
                onClick={props.onOpen}
            >
                Privacy Policy
            </Button>
        </>
    )
}