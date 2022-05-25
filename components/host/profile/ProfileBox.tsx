import { Box, Flex, Link, Spacer, } from "@chakra-ui/react"
import { CONST_BORDER_RADIUS } from '../../../themes/constants'
import SideBySideContainer from '../../profile/SideBySideContainer';
import ProfileButton from "../../profile/ProfileButton";
import HostInfoBox from "./HostInfoBox";
import HostMatchesBox from './HostMatchesBox'
import type { CurrentHostInfo } from '../../../lib/models/host'
import type { HostMatchResult } from '../../../lib/models/match'

interface ProfileBoxProps {
    currentHost: CurrentHostInfo
    hostMatches: HostMatchResult[]
    hostEmail: string
    hostId: number
}

export default function ProfileBox(props: ProfileBoxProps) {

    const {
        currentHost,
        hostMatches,
        hostEmail,
        hostId,
    } = props

    return (
        <>
            <Box paddingBottom={"4rem"}>
                <Flex alignItems={{ base: "center", md: "start" }} direction={{ base: 'column', md: 'row' }}>
                    <Spacer />
                    <SideBySideContainer height="877px" color="primary.white" minW="374px" shadow="lg">
                        <HostInfoBox currentHost={currentHost} hostEmail={hostEmail} />
                        <Box marginTop="63px">
                            <ProfileButton buttonText='Edit' color='primary.gray' />
                        </Box>
                    </SideBySideContainer>
                    <Spacer />
                    <SideBySideContainer height="877px" color="primary.white" minW="374px" shadow="lg">
                        <HostMatchesBox hostMatches={hostMatches} />
                        <Box marginTop="63px">
                            <ProfileButton buttonText='Edit Matches' color='primary.green' />
                        </Box>
                    </SideBySideContainer>
                    <Spacer />
                </Flex>
            </Box>
        </>
    )
}