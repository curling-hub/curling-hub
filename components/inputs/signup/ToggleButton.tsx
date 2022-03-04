// import { MouseEventHandler } from 'react';
import { Button } from "@chakra-ui/react"
import theme from '../../../themes/colors'

interface ToggleButtonProps {
    buttonText: string;
    isToggled: boolean;
    setToggle: () => void;
}

export default function ToggleButton(props: ToggleButtonProps) {
    return (
        <>
            <Button
                width="118px"
                height="62px"
                fontSize="20px"
                fontStyle="normal"
                //fontFamily="Roboto"
                fontWeight="bold"
                textColor={theme.colors.primary.black}
                background={props.isToggled ? theme.colors.primary.gray : theme.colors.primary.white}
                boxShadow={"0px 0px 4px 3px " + theme.colors.primary.gray}
                borderRadius="35px"
                onClick={props.setToggle}
                _hover={{
                    transform: "scale(1.02)"
                }}
                _active={{
                    transform: "scale(0.99)",
                }}
                _focus={{
                    border: "none"
                }}
            >
                {props.buttonText}
            </Button>
        </>
    )
}
