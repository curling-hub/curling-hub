import { Box, Flex, Spacer, VStack, Text } from "@chakra-ui/react"
import { CONST_BORDER_RADIUS } from '../../../themes/constants'
import SideBySideContainer from '../../profile/SideBySideContainer';
import type { HostInfo } from '../../../lib/models/host'



interface HostInfoBoxProps {
    currentHost: HostInfo
}

export default function HostInfoBox(props: HostInfoBoxProps) {
    const {
        currentHost,
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
                    {currentHost.organization}
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
                        <Text>
                            {currentHost.iceSheets && currentHost.iceSheets}
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
                    currentHost doesn't have email, should I infer from session?
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

        </>
    )
}