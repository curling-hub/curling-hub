import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import TeamLayout from '../../../components/layouts/TeamLayout'
import Footer from "../../../components/footer/footer";
import {
    Box,
    Text,
    Flex,
    Spacer,
    Link,
    VStack,
} from '@chakra-ui/react'
import LeftHandBox from "../../../components/profile/LeftHandBox"
import SideBySideContainer from '../../../components/profile/SideBySideContainer';
import MatchesBox from '../../../components/profile/MatchesBox';
import MatchesTable from '../../../components/profile/MatchesTable'
import MembersTable from '../../../components/profile/MembersTable'
import { TeamMatch, TeamWithMembersAndRatings } from '../../../lib/models/teams'
import { Category, TeamMember } from "../../../lib/models"
import { getTeamMatches, getTeamContactInfo, getTeamCategories, getTeamInfo, getTeamEmailById, isTeamAdmin } from '../../../lib/handlers/teams'
import { convertAndVerifyContextId, getSession, getSessionServerSideResult } from '../../../lib/auth/session'
import { teamPagesLoggedInRedirects } from '../../../lib/auth/redirect';
import { AccountType } from '../../../lib/models/accountType';
import CurloButton from '../../../components/buttons/CurloButton';

interface TeamProfileProps {
    teamInfo?: TeamWithMembersAndRatings
    teamMatches?: TeamMatch[]
    teamEmail: string
    teamCategories?: Category[]
    teamMembers?: TeamMember[]
    teamId?: number
}

const TeamProfile: NextPage<TeamProfileProps> = (props: TeamProfileProps) => {

    const {
        teamInfo,
        teamMatches = [],
        teamCategories = [],
        teamMembers = [],
        teamEmail,
        teamId
    } = props

    return (
        <>
            <Head>
                <title>Team Profile | Curlo</title>
            </Head>
            <Box
                position="relative"
                w="100%"
                minH="100vh"
                bgGradient="linear-gradient(primary.purple, primary.white)"
            >
                <TeamLayout teamId={teamId} />
                <Box paddingBottom={"4rem"}>

                    <Flex alignItems={{ base: "center", md: "start" }} direction={{ base: "column", md: "row" }}>
                        <Spacer />
                        <SideBySideContainer height='1022px'>
                            <VStack spacing="78px" height="100%">
                                <LeftHandBox color='primary.white'>
                                    <VStack spacing="0px" h="356px">
                                        {teamInfo && (
                                            <Text
                                                fontSize="2.5em"
                                                fontWeight="bold"
                                            >
                                                {teamInfo.name}
                                            </Text>
                                        )}
                                        <Text
                                            fontSize="1.5em"
                                            fontWeight="bold"
                                        >
                                            Contact
                                        </Text>
                                        <Text>
                                            {teamEmail}
                                        </Text>
                                        <MembersTable teamMembers={teamMembers} teamCategories={teamCategories} />
                                    </VStack>
                                    <CurloButton buttonText="Edit" color="primary.gray" width="64%" size="md" />
                                </LeftHandBox>
                                <LeftHandBox color='primary.green'>
                                    <VStack>
                                        <Text
                                            fontSize="2.5em"
                                            fontWeight="bold"
                                        >
                                            Rating
                                        </Text>
                                        {teamInfo && (
                                            <Text
                                                fontSize="6em"
                                                fontWeight="bold"
                                            >
                                                {teamInfo.teamGlickoInfo?.rating}
                                            </Text>
                                        )}
                                    </VStack>
                                </LeftHandBox>
                            </VStack>
                        </SideBySideContainer>
                        <Spacer />
                        <SideBySideContainer height='1022px' minW='322px'>
                            <MatchesBox
                                color="primary.white"
                                boxShadow='lg'
                            >
                                <Text fontSize="2.5rem" marginTop="5px" fontWeight="bold">
                                    Matches
                                </Text>
                                <MatchesTable teamMatches={teamMatches} teamId={teamInfo?.teamId} />
                                <Box marginTop={{ base: "19px", md: "65px" }}>
                                    <Link href={`/teams/${teamId}/matches`} style={{ textDecoration: 'none' }}>
                                        <CurloButton buttonText="View Matches" color="primary.green" width="64%" size="md" />
                                    </Link>
                                </Box>
                            </MatchesBox>
                        </SideBySideContainer>
                        <Spacer />
                    </Flex>
                </Box>
                <Footer />
            </Box >
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const sessionWrapper = await getSession(context)
    const { signedIn, signedUp, session } = sessionWrapper
    if (!signedIn || !signedUp || !session) {
        return getSessionServerSideResult(sessionWrapper)
    }

    const userId = session.user.id
    if (session.user.account_type !== AccountType.TEAM) {
        return teamPagesLoggedInRedirects(userId, session.user.account_type)
    }

    const { params } = context
    const teamId = convertAndVerifyContextId(params)
    if (!teamId) {
        return { notFound: true }
    }

    try {
        const [teamInfo, teamMatches, teamContactInfo, teamCategories, hasPermission, teamEmail] = await Promise.all([
            getTeamInfo(teamId),
            getTeamMatches(teamId),
            getTeamContactInfo(teamId),
            getTeamCategories(teamId),
            isTeamAdmin(userId, teamId),
            getTeamEmailById(teamId),
        ])
        if (!teamInfo || !hasPermission) {
            return { notFound: true }
        }
        return {
            props: {
                teamInfo,
                teamMatches,
                teamContactInfo,
                teamCategories,
                teamMembers: teamInfo?.members || [],
                teamEmail,
                teamId,
            }
        }

    } catch (error) {
        console.log(error)
        throw error
    }
}

export default TeamProfile

