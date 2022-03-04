import { Button } from "@chakra-ui/react";

interface InfoButtonProps {
    onOpen: () => void;
}

export default function InfoButton(props: InfoButtonProps) {

    return (
        <>
            <Button
                variant="link"
                width="195px"
                fontWeight="bold"
                fontSize="12px"
                textAlign="center"
                onClick={props.onOpen}
            >
                Why do we need this information?
            </Button>
        </>
    )
}