import { IconButton } from "@chakra-ui/react";
import { CheckIcon } from '@chakra-ui/icons'
import theme from '../../../themes/colors'

interface CheckBoxButtonProps {
    isToggled?: boolean;
    onClick?: () => void;
}

export default function TextField({ isToggled }: CheckBoxButtonProps) {
    return (
        <>
            <IconButton
                width="20px"
                height="20px"
                minWidth="20px"
                aria-label='check-box'
                isRound={true}
                icon={<CheckIcon />}
                colorScheme="blackAlpha"
                boxShadow={"0px 0px 4px 2px " + theme.colors.primary.gray}
                _active={{
                    background: theme.colors.primary.white
                }}
                _hover={{
                    background: theme.colors.primary.green
                }}
                _focus={{
                    background: theme.colors.primary.green
                }}
            />
        </>
    );
}