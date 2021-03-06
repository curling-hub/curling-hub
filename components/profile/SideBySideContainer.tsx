import { Box } from "@chakra-ui/react"
import { CONST_BORDER_RADIUS } from '../../themes/constants'

interface SideBySideContainerProps {
    children?: React.ReactNode;
    minW?: string;
    height?: string;
    color?: string;
    shadow?: string;
}

export default function SideBySideContainer(props: SideBySideContainerProps) {
    return (
        <>
            <Box
                borderRadius={CONST_BORDER_RADIUS}
                background={props.color}
                marginTop="32px"
                marginBottom="50px"
                width={{ base: "81%", md: "42%" }}
                maxW="605px"
                minW={props.minW}
                height={props.height}
                textAlign="center"
                top="0"
                shadow={props.shadow}
            >
                {props.children || <></>}
            </Box>
        </>
    );
}