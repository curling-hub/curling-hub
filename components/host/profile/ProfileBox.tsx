import { Box, Flex, Spacer, } from "@chakra-ui/react"
import { CONST_BORDER_RADIUS } from '../../../themes/constants'
import SideBySideContainer from '../../profile/SideBySideContainer';

interface ProfileBoxProps {
    // query arrays passed here
}

export default function ProfileBox(props: ProfileBoxProps) {

    const {

    } = props

    return (
        <>
            <Box paddingBottom={"4rem"}>
                <Flex direction={{ base: 'column', md: 'row' }}>
                    <Spacer />
                    <SideBySideContainer>

                    </SideBySideContainer>
                    <Spacer />
                    <SideBySideContainer>

                    </SideBySideContainer>
                    <Spacer />
                </Flex>
            </Box>
        </>
    )
}