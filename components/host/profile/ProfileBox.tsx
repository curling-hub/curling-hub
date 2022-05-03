import { Box, Flex, Spacer, } from "@chakra-ui/react"
import { CONST_BORDER_RADIUS } from '../../../themes/constants'
import SideBySideContainer from '../../profile/SideBySideContainer';
import ProfileButton from "../../profile/ProfileButton";
import HostInfoBox from "./HostInfoBox";
import HostMatchesBox from './HostMatchesBox'
import type { HostInfo } from '../../../lib/models/host'
import type { MatchResultSerial } from '../../../lib/models/match'

interface ProfileBoxProps {
    currentHost: HostInfo
    currentMatches: MatchResultSerial[]
}

export default function ProfileBox(props: ProfileBoxProps) {

    const {
        currentHost,
        currentMatches,
    } = props

    return (
        <>
            <Box paddingBottom={"4rem"}>
                <Flex alignItems={{ base: "center", md: "start" }} direction={{ base: 'column', md: 'row' }}>
                    <Spacer />
                    <SideBySideContainer height="877px" color="primary.white" minW="374px" shadow="lg">
                        <HostInfoBox currentHost={currentHost} />
                        <ProfileButton buttonText='Edit' color='primary.gray' />
                    </SideBySideContainer>
                    <Spacer />
                    <SideBySideContainer height="877px" color="primary.white" minW="374px" shadow="lg">
                        <HostMatchesBox currentMatches={currentMatches} />
                        <ProfileButton buttonText='Edit Matches' color='primary.green' />
                    </SideBySideContainer>
                    <Spacer />
                </Flex>
            </Box>
        </>
    )
}