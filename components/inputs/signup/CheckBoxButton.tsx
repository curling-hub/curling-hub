import React, { useState } from 'react';
import { IconButton } from "@chakra-ui/react";
import { CheckIcon } from '@chakra-ui/icons'
import theme from '../../../themes/colors'

export default function TextField() {

    const [toggle, setToggle] = useState(false);

    const toggleButton = () => {
        setToggle(!toggle)
    }

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
                background={toggle ? theme.colors.primary.green : theme.colors.primary.gray}
                boxShadow={"0px 0px 4px 2px " + theme.colors.primary.gray}
                onClick={toggleButton}
                _active={{
                    background: theme.colors.primary.white
                }}
                _focus={{
                    border: "none"
                }}
            />
        </>
    );
}