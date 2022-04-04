import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import TeamLayout from '../components/layouts/TeamLayout'
import {
    Box,
    Text,
    Flex,
    Spacer,
    Link,
    VStack,
} from '@chakra-ui/react'
import LeftHandBox from "../components/profile/LeftHandBox"
import SideBySideContainer from '../components/profile/SideBySideContainer';
import ProfileButton from '../components/profile/ProfileButton';
import MatchesBox from '../components/profile/MatchesBox';
import MatchesTable from '../components/profile/MatchesTable'
import MembersTable from '../components/profile/MembersTable'
import { TeamInfo, TeamMatches, TeamContactInfo, TeamCategories, TeamMembers } from '../lib/models/teams'
import { getSession } from 'next-auth/react'
import { getTeamMatches, getTeamContactInfo, getTeamCategories, getTeamMembers, getTeamInfo } from '../lib/handlers/teams'


interface TeamProfileProps {
    teamInfo?: TeamInfo[]
    teamMatches?: TeamMatches[]
    teamContactInfo?: TeamContactInfo[]
    teamEmail?: string
    teamCategories?: TeamCategories[]
    teamMembers?: TeamMembers[]
}

const TeamProfile: NextPage<TeamProfileProps> = (props: TeamProfileProps) => {

    const {
        teamInfo = [],
        teamMatches = [],
        teamContactInfo = [],
        teamCategories = [],
        teamMembers = [],

    } = props

    return (
        <>
            <Head>
                <title>Team Profile | Curlo</title>
            </Head>
            <Box
                position="absolute"
                w="100%"
                h="100vh"
                bgGradient="linear-gradient(primary.purple, primary.white)"
            >
                <TeamLayout />
                <Flex alignItems={{ base: "center", md: "start" }} direction={{ base: "column", md: "row" }}>
                    <Spacer />
                    <SideBySideContainer height='1022px'>
                        <VStack spacing="78px" height="100%">
                            <LeftHandBox color='primary.white'>
                                <VStack spacing="0px" h="356px">
                                    {teamInfo?.map((team: TeamInfo, i: number) => (
                                        <Text key={`${i}`}
                                            fontSize="2.5em"
                                            fontWeight="bold"
                                        >
                                            {team.name}
                                        </Text>
                                    ))}
                                    <Text
                                        fontSize="1.5em"
                                        fontWeight="bold"
                                    >
                                        Contact
                                    </Text>
                                    {/* {teamContactInfo?.map((team: TeamContactInfo, i: number) => (
                                        <Text key={`${i}`}>
                                            {team.teamEmail}
                                        </Text>
                                    ))} */}
                                    <Text>
                                        ralphs.wonderful.life@gmail.com
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
                                    {teamInfo?.map((team: TeamInfo, i: number) => (
                                        <Text key={`${i}`}
                                            fontSize="6em"
                                            fontWeight="bold"
                                        >
                                            {team.rating}
                                        </Text>
                                    ))}
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
                            <MatchesTable teamMatches={teamMatches} teamName="The Sliding Stones" />
                            <Box marginTop="63px">
                                <Link href="/matches">
                                    <ProfileButton buttonText='View Matches' color='primary.green' top="-20px" />
                                </Link>
                            </Box>
                        </MatchesBox>
                    </SideBySideContainer>
                    <Spacer />
                </Flex>
            </Box >
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)
    try {
        const [teamInfo, teamMatches, teamContactInfo, teamCategories, teamMembers] = await Promise.all([
            getTeamInfo('1'),
            getTeamMatches('1'),
            getTeamContactInfo('1'),
            getTeamCategories('1'),
            getTeamMembers('1')
        ])
        return {
            props: {
                teamInfo,
                teamMatches,
                teamContactInfo,
                teamCategories,
                teamMembers
            },
        }
    } catch (error) {
        console.log(error)
    }
    return {
        props: {},
    }
}

export default TeamProfile

