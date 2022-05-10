import { Box } from "@chakra-ui/react"
import { CONST_BORDER_RADIUS } from '../../themes/constants'

interface MatchesBoxProps {
    children?: React.ReactNode;
    color?: string;
    minW?: string;
    boxShadow?: string;
}

export default function MatchesBox(props: MatchesBoxProps) {
    return (
        <>
            <Box
                background={props.color}
                alignItems="center"
                padding="1rem"
                borderRadius={CONST_BORDER_RADIUS}
                boxShadow={props.boxShadow}
                maxH="100%"
                w="100%"
                minW={props.minW}
                height={{ base: "900px", md: "1022px" }}
                textAlign="center"
                top="0"
            >
                {props.children || <></>}
            </Box>
        </>
    );
}