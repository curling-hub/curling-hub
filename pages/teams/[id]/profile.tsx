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
import ProfileButton from '../../../components/profile/ProfileButton';
import MatchesBox from '../../../components/profile/MatchesBox';
import MatchesTable from '../../../components/profile/MatchesTable'
import MembersTable from '../../../components/profile/MembersTable'
import { TeamMatch, TeamWithMembersAndRatings } from '../../../lib/models/teams'
import { Category, TeamMember } from "../../../lib/models"
import { getTeamMatches, getTeamContactInfo, getTeamCategories, getTeamInfo, getTeamEmailById } from '../../../lib/handlers/teams'
import { getSession, getSessionServerSideResult } from '../../../lib/auth/session'

interface TeamProfileProps {
    teamInfo?: TeamWithMembersAndRatings
    teamMatches?: TeamMatch[]
    teamEmail: string
    teamCategories?: Category[]
    teamMembers?: TeamMember[]
}

const TeamProfile: NextPage<TeamProfileProps> = (props: TeamProfileProps) => {

    const {
        teamInfo,
        teamMatches = [],
        teamCategories = [],
        teamMembers = [],
        teamEmail
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
                <TeamLayout />
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
                                    <ProfileButton buttonText='Edit' color='primary.gray' />
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
                        <SideBySideContainer>
                            <MatchesBox
                                color="primary.white"
                                boxShadow='lg'
                            >
                                <Text fontSize="2.5rem" marginTop="5px" fontWeight="bold">
                                    Matches
                                </Text>
                                <MatchesTable teamMatches={teamMatches} teamId={teamInfo?.teamId} />
                                <Box marginTop="63px">
                                    <Link href="/matches">
                                        <ProfileButton buttonText='View Matches' color='primary.green' top="-20px" />
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
    // Redirect if not authentiated
    const id = context.params?.id ? Number(context.params.id) : 1
    const sessionWrapper = await getSession(context)
    const { signedIn, signedUp, session } = sessionWrapper
    if (!signedIn || !signedUp) {
        return getSessionServerSideResult(sessionWrapper)
    }
    try {
        const [teamInfo, teamMatches, teamContactInfo, teamCategories/* , teamEmail */] = await Promise.all([
            getTeamInfo(id),
            getTeamMatches(id),
            getTeamContactInfo(id),
            getTeamCategories(id),
            //getTeamEmailById(id),
        ])
        const teamEmail = session?.["user"].email || null
        return {
            props: {
                teamInfo,
                teamMatches,
                teamContactInfo,
                teamCategories,
                teamMembers: teamInfo?.members || [],
                teamEmail,
            }
        }

    } catch (error) {
        console.log(error)
    }
    return {
        props: {},
    }
}

export default TeamProfile

