import { Button } from "@chakra-ui/react";
import theme from '../../../themes/colors'

interface CreateAccountButtonProps {
    onClick?: () => void;
}

export default function CreateAccountButton({ }: CreateAccountButtonProps) {
    return (
        <>
            <Button
                width="386px"
                height="62px"
                fontSize="25px"
                fontStyle="normal"
                //fontFamily="Roboto"
                fontWeight="bold"
                textColor={theme.colors.primary.black}
                background={theme.colors.primary.green}
                boxShadow={"0px 0px 4px 3px " + theme.colors.primary.gray}
                borderRadius="35px"
                textAlign="center"
                _hover={{
                    transform: "scale(1.02)"
                }}
                _active={{
                    transform: "scale(0.99)"
                }}
                _focus={{
                    border: "none"
                }}
            >
                Create Account
            </Button>
        </>
    );
}