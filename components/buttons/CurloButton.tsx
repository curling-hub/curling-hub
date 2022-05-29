import { Button } from "@chakra-ui/react";
import { JSXElementConstructor, MouseEventHandler, ReactElement } from "react";
import { REG_BUTTON_FONT_SIZE } from "../../themes/constants";

interface CurloButtonProps {
    buttonText?: string;
    color?: string;
    isSubmitting?: boolean;
    top?: string;
    type?: "submit";
    isFullWidth?: boolean;
    marginRight?: string;
    width?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    size?: "md";
    leftIcon?: ReactElement<any, string | JSXElementConstructor<any>>;
}

export default function CurloButton(props: CurloButtonProps) {
    return (
        <>
            <Button
                leftIcon={props.leftIcon}
                padding={props.size === "md" ? "25px 30px" : undefined}
                marginRight={props.marginRight}
                width={props.width}
                type={props.type}
                isFullWidth={props.isFullWidth}
                disabled={props.isSubmitting}
                background={props.color}
                borderRadius="full"
                boxShadow="md"
                fontSize={props.size === "md" ? REG_BUTTON_FONT_SIZE : undefined}
                top={props.top}
                _hover={props.color === "primary.green" ? { bg: "green.400" } : { bg: "gray.400" }}
                _active={props.color === "primary.green" ? { bg: "green.400" } : { bg: "gray.400" }}
                _focus={{ boxShadow: "lg" }}
                onClick={props.onClick}
            >
                {props.buttonText}
            </Button>
        </>
    );
}