import { Button } from "@chakra-ui/react";
import { REG_BUTTON_FONT_SIZE } from "../../themes/constants";

interface ProfileButtonProps {
    buttonText?: string;
    color?: string;
    top?: string;
}

export default function ProfileButton(props: ProfileButtonProps) {
    return (
        <>
            <Button
                background={props.color}
                borderRadius="full"
                boxShadow="md"
                padding="25px 50px"
                fontSize={REG_BUTTON_FONT_SIZE}
                w="64%"
                top={props.top}
            >
                {props.buttonText}
            </Button>
        </>
    );
}