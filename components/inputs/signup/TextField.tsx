import { Input } from "@chakra-ui/react"
import theme from '../../../themes/colors'

interface TextFieldProps {
    fieldPlaceholder?: string;
    width?: string;
}

export default function TextField({ fieldPlaceholder, width }: TextFieldProps) {
    return (
        <>
            <Input
                placeholder={fieldPlaceholder}
                width={width}
                height="62px"
                fontSize="20px"
                //fontFamily="Roboto"
                fontWeight="bold"
                textColor={theme.colors.primary.black}
                background={theme.colors.primary.white}
                focusBorderColor={theme.colors.primary.green}
                boxShadow={"inset 0px 0px 4px " + theme.colors.primary.gray}
                borderRadius="35px"
            />
        </>
    );
}