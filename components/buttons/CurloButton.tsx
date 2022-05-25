import { Button } from "@chakra-ui/react";
import { REG_BUTTON_FONT_SIZE } from "../../themes/constants";

interface CurloButtonProps {
    buttonText?: string;
    color?: string;
    isSubmitting?: boolean;
    top?: string;
    type?: "submit";
}

export default function CurloButton(props: CurloButtonProps) {
    return (
        <>
            <Button
                padding="25px 30px"
                type={props.type}
                isFullWidth
                disabled={props.isSubmitting}
                background={props.color}
                borderRadius="full"
                boxShadow="md"
                fontSize={REG_BUTTON_FONT_SIZE}
                top={props.top}
                _hover={{ bg: "green.400" }}
                _active={{ bg: "green.400" }}
            >
                {props.buttonText}
            </Button>
        </>
    );
}