import React, { useState } from 'react';
// import { MouseEventHandler } from 'react';
import { Button } from "@chakra-ui/react"
import theme from '../../../themes/colors'

export default function ToggleButton() {

    const [male, setMale] = useState(false);
    const [female, setFemale] = useState(false);
    const [other, setOther] = useState(false);

    const triggerMale = () => {
        setMale(true)
        setFemale(false)
        setOther(false)
    }
    const triggerFemale = () => {
        setMale(false)
        setFemale(true)
        setOther(false)
    }
    const triggerOther = () => {
        setMale(false)
        setFemale(false)
        setOther(true)
    }

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
                background={male ? theme.colors.primary.gray : theme.colors.primary.white}
                boxShadow={"0px 0px 4px 3px " + theme.colors.primary.gray}
                borderRadius="35px"
                onClick={triggerMale}
                _hover={{
                    transform: "scale(1.02)"
                }}
                _active={{
                    transform: "scale(0.99)",
                }}
            >
                Male
            </Button>
            <Button
                width="118px"
                height="62px"
                fontSize="20px"
                fontStyle="normal"
                //fontFamily="Roboto"
                fontWeight="bold"
                textColor={theme.colors.primary.black}
                background={female ? theme.colors.primary.gray : theme.colors.primary.white}
                boxShadow={"0px 0px 4px 3px " + theme.colors.primary.gray}
                borderRadius="35px"
                onClick={triggerFemale}
                _hover={{
                    transform: "scale(1.02)"
                }}
                _active={{
                    transform: "scale(0.99)",
                }}
            >
                Female
            </Button>
            <Button
                width="118px"
                height="62px"
                fontSize="20px"
                fontStyle="normal"
                //fontFamily="Roboto"
                fontWeight="bold"
                textColor={theme.colors.primary.black}
                background={other ? theme.colors.primary.gray : theme.colors.primary.white}
                boxShadow={"0px 0px 4px 3px " + theme.colors.primary.gray}
                borderRadius="35px"
                onClick={triggerOther}
                _hover={{
                    transform: "scale(1.02)",
                    // background: ${female ? theme.colors.primary.gray : theme.colors.primary.white}
                }}
                _active={{
                    transform: "scale(0.99)",
                }}
            >
                N/A
            </Button>
        </>
    );
}
