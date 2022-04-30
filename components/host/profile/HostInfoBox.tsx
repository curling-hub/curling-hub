import { Box, Flex, Spacer, VStack, Text } from "@chakra-ui/react"
import { CONST_BORDER_RADIUS } from '../../../themes/constants'
import SideBySideContainer from '../../profile/SideBySideContainer';



interface HostInfoBoxProps {
    // hostInfo?: HostInfo
}

export default function HostInfoBox(props: HostInfoBoxProps) {

    const {
        // hostInfo
    } = props

    return (
        <>
            <Flex
                align="center"
                minW="110px"
                direction="column"
                h="60%"
                marginTop="31px"
            >
                <Text
                    fontSize="2.5em"
                    fontWeight="bold"
                >
                    Host Name
                </Text>
                <Spacer />
                <Flex align="start" w="75%" maxW="388px" minW="302px">
                    <VStack align="start" spacing="-4px">
                        <Text
                            fontSize="1.5em"
                            fontWeight="bold"
                            paddingBottom="3px"
                        >
                            Address
                        </Text>
                        <Text>
                            AddressString[0]
                        </Text>
                        <Text>
                            AddressString[1]
                        </Text>
                        <Text>
                            AddressString[2]
                        </Text>
                        <Text>
                            AddressString[3]
                        </Text>
                    </VStack>
                    <Spacer />
                    <VStack spacing="-4px">
                        <Text
                            fontSize="1.5em"
                            fontWeight="bold"
                            paddingBottom="3px"
                        >
                            Sheets of Ice
                        </Text>
                        <Text>
                            IceSheetString
                        </Text>
                    </VStack>

                </Flex>
                <Spacer />
                <Text
                    fontSize="1.5em"
                    fontWeight="bold"
                >
                    Contact
                </Text>
                <Text>
                    Email
                </Text>
                <Text>
                    Phone Number
                </Text>
                <Spacer />
                <Text
                    fontSize="1.5em"
                    fontWeight="bold"
                >
                    Website
                </Text>
                <Text>
                    The Website
                </Text>
                <Spacer />
            </Flex>

        </>
    )
}