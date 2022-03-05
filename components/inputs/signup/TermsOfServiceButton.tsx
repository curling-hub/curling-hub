import { Button, useDisclosure } from "@chakra-ui/react";

interface TermsofServiceButtonProps {
    onOpen: () => void;
}

export default function TermsOfServiceButton(props: TermsofServiceButtonProps) {

    return (
        <>
            <Button
                variant="link"
                fontSize="15px"
                onClick={props.onOpen}
            >
                Terms of Service
            </Button>
        </>
    )
}