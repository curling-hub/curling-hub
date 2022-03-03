import { Select } from "@chakra-ui/react";
import theme from '../../../themes/colors'

interface ClubDropdownProps {
    dropDownText?: string;
}

export default function TextField({ dropDownText }: ClubDropdownProps) {
    return (
        <>
            <Select
                placeholder={dropDownText}
                width="386px"
                height="62px"
                iconSize="80px" // there is an upper limit to the arrow size
                fontSize="20px"
                fontStyle="normal"
                //fontFamily="Roboto"
                fontWeight="bold"
                textColor={theme.colors.primary.black}
                background={theme.colors.primary.white}
                boxShadow={"inset 0px 0px 4px " + theme.colors.primary.gray}
                borderRadius="35px"
            />
        </>
    );
}