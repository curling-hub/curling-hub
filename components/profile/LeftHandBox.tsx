import { Box } from "@chakra-ui/react"
import { CONST_BORDER_RADIUS } from '../../themes/constants'

interface LeftHandBoxProps {
    children?: React.ReactNode;
    color?: string;

}

export default function LeftHandBox(props: LeftHandBoxProps) {
    return (
        <>
            <Box
                background={props.color}
                alignItems="center"
                borderRadius={CONST_BORDER_RADIUS}
                padding="1rem"
                boxShadow="md"
                textAlign="center"
                width="100%"
                /* minW="415px" */
                /* height={{ base: "36%", md: "46%" }} */
                height="46%"
            >
                {props.children || <></>}
            </Box>
        </>
    );
}