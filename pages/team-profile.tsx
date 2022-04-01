import type { NextPage } from 'next'
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

const TeamProfile: NextPage = () => {
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
                <Flex alignItems={{ base: "center", md: "none" }} direction={{ base: "column", md: "row" }} >
                    <Spacer />
                    <SideBySideContainer height='1022px'>
                        <VStack spacing="78px" height="100%">
                            <LeftHandBox color='primary.white'>
                                <VStack spacing="-2px">
                                    <Text
                                        fontSize="2.5em"
                                        fontWeight="bold"
                                    >
                                        Team Name
                                    </Text>
                                    <Text
                                        fontSize="1.25em"
                                        fontWeight="bold"
                                    >
                                        Contact
                                    </Text>
                                    <Text>
                                        email
                                    </Text>
                                    <MembersTable />
                                    <ProfileButton buttonText='Edit' color='primary.gray' top='100px' />
                                </VStack>
                            </LeftHandBox>
                            <LeftHandBox color='primary.green'>
                                <Text
                                    fontSize="2.5em"
                                    fontWeight="bold"
                                >
                                    Rating
                                </Text>
                            </LeftHandBox>

                        </VStack>
                    </SideBySideContainer>
                    <Spacer />
                    <SideBySideContainer
                        minW="445px"
                        height='1022px'
                    >
                        <MatchesBox
                            color="primary.white"
                            boxShadow='lg'
                            minW='445px'
                        >
                            <Text fontSize="2.5rem" marginTop="5px" fontWeight="bold">
                                Matches
                            </Text>
                            <MatchesTable />
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

export default TeamProfile

