import { Box, Flex, Spacer } from "@chakra-ui/react"
import SideBySideContainer from '../../profile/SideBySideContainer';
import HostInfoBox from "./HostInfoBox";
import HostMatchesBox from './HostMatchesBox'
import type { CurrentHostInfo } from '../../../lib/models/host'
import type { HostMatchResult } from '../../../lib/models/match'
import CurloButton from "../../buttons/CurloButton";

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
                            <CurloButton buttonText="Edit" color="primary.gray" width="64%" size="md" />
                        </Box>
                    </SideBySideContainer>
                    <Spacer />
                    <SideBySideContainer height="877px" color="primary.white" minW="374px" shadow="lg">
                        <HostMatchesBox hostMatches={hostMatches} hostId={hostId} />
                        <Box marginTop="63px">
                            <CurloButton buttonText="Edit Matches" color="primary.green" width="64%" size="md" />
                        </Box>
                    </SideBySideContainer>
                    <Spacer />
                </Flex>
            </Box>
        </>
    )
}