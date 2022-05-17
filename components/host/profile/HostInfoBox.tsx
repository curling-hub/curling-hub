import { Box, Flex, Spacer, VStack, Text, HStack } from "@chakra-ui/react"
import { CONST_BORDER_RADIUS } from '../../../themes/constants'
import SideBySideContainer from '../../profile/SideBySideContainer';
import type { CurrentHostInfo } from '../../../lib/models/host'



interface HostInfoBoxProps {
    currentHost: CurrentHostInfo
    hostEmail: string
}

export default function HostInfoBox(props: HostInfoBoxProps) {
    const {
        currentHost,
        hostEmail,
    } = props

    const iceSheetString = currentHost?.iceSheets?.toString().replaceAll(',', '').slice(0, 3) || null

    return (
        <>
            <Box h="75%">
                <Flex
                    align="center"
                    minW="110px"
                    direction="column"
                    h="100%"
                    marginTop="31px"
                >
                    <Text
                        fontSize="2.5em"
                        fontWeight="bold"
                        h="120px"
                    >
                        {currentHost.organization}
                    </Text>
                    <Flex align="start" w="75%" maxW="388px" minW="302px">
                        <VStack align="start" spacing="-4px">
                            <Text
                                fontSize="1.5em"
                                fontWeight="bold"
                                paddingBottom="3px"
                            >
                                Address
                            </Text>
                            <Text align="left">
                                {currentHost.streetAddress}<br />
                                {currentHost.addressExtras && <>{currentHost.addressExtras} <br /></>}
                                {currentHost.city}, {currentHost.state} {currentHost.zip}<br />
                                {currentHost.country}
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
                            <HStack>
                                <Text>
                                    {currentHost.iceSheets?.length}
                                </Text>
                                <Text>
                                    {"(" + iceSheetString + '...' + ")"}
                                </Text>
                            </HStack>
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
                        {hostEmail}
                    </Text>
                    <Text>
                        {currentHost.phoneNumber}
                    </Text>
                    <Spacer />
                    <Text
                        fontSize="1.5em"
                        fontWeight="bold"
                    >
                        Website
                    </Text>
                    <Text>
                        {currentHost.website ? currentHost.website : "N/A"}
                    </Text>
                    <Spacer />
                </Flex>
            </Box>
        </>
    )
}