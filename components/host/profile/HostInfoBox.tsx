import { Box, Flex, Spacer, VStack, Text } from "@chakra-ui/react"
import { CONST_BORDER_RADIUS } from '../../../themes/constants'
import SideBySideContainer from '../../profile/SideBySideContainer';



interface HostInfoBoxProps {
    // query arrays passed here
}

export default function HostInfoBox(props: HostInfoBoxProps) {

    const {

    } = props

    return (
        <>

            <Flex align="start" w="100%">
                <Spacer />
                <VStack align="center" minW="110px" spacing="4px">
                    <Text
                        fontSize="1.5em"
                        fontWeight="bold"
                    >Address</Text>
                    {/* {teamMembers.map((member, i) => (
                        <Text key={`${i}`}>
                            {member.memberName}
                        </Text>
                    ))} */}
                </VStack>
                <Spacer />
                <VStack align="center" spacing="4px">
                    <Text
                        fontSize="1.5em"
                        fontWeight="bold"
                    >Sheets of Ice</Text>
                    {/*{teamCategories.map((category, i) => (
                        <Text key={`${i}`}>
                            {category.categoryName}
                        </Text>
                    ))} */}
                </VStack>
                <Spacer />
            </Flex>
        </>
    )
}