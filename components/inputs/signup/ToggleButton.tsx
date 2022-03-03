import { Button } from "@chakra-ui/react"
import theme from '../../../themes/colors'

interface ToggleButtonProps {
    buttonText?: string;
    isToggled?: boolean;
    onClick?: () => void;
}

export default function ToggleButton({ buttonText, isToggled = false }: ToggleButtonProps) {
    if (isToggled) {
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
                    background={theme.colors.primary.gray}
                    boxShadow={"0px 0px 4px 3px " + theme.colors.primary.gray}
                    borderRadius="35px"
                    _hover={{
                        transform: "scale(1.02)"
                    }}
                    _active={{
                        transform: "scale(0.99)",
                    }}
                >
                    {buttonText}
                </Button>
            </>
        );
    }
    else {
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
                    background={theme.colors.primary.white}
                    boxShadow={"0px 0px 4px 3px " + theme.colors.primary.gray}
                    borderRadius="35px"
                    _hover={{
                        transform: "scale(1.05)"
                    }}
                    _active={{
                        transform: "scale(0.99)",
                        background: theme.colors.primary.gray
                    }}
                    _focus={{
                        background: theme.colors.primary.gray
                    }}
                >
                    {buttonText}
                </Button>
            </>
        );
    }
}