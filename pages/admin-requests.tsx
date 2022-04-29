import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import TeamLayout from '../components/layouts/TeamLayout'
import Footer from "../components/footer/footer";
import {

    Box,
    Text,
    Flex,
    Spacer,
    Link,
    VStack,
    Table,
    Thead,
    Tbody,
    Tr,
    Td,
    TableCaption,
    TableContainer,
    Container,
} from '@chakra-ui/react'
import LeftHandBox from "../components/profile/LeftHandBox"
import SideBySideContainer from '../components/profile/SideBySideContainer';
import ProfileButton from '../components/profile/ProfileButton';
import MatchesBox from '../components/profile/MatchesBox';
import MatchesTable from '../components/profile/MatchesTable'
import MembersTable from '../components/profile/MembersTable'
import { TeamInfo, TeamMatches, TeamCategories, TeamMembers } from '../lib/models/teams'
import { getTeamMatches, getTeamContactInfo, getTeamCategories, getTeamMembers, getTeamInfo } from '../lib/handlers/teams'
import { getSession, getSessionServerSideResult } from '../lib/auth/session'


const adminRequests: NextPage = () => {


    return (
        <>
            <Head>
                <title>Admin Requests | Curlo</title>
            </Head>
            <Box
                position="relative"
                w="100%"
                minH="100vh"
                bgGradient="linear-gradient(primary.purple, primary.white)"
            >
                <TeamLayout />
                <Box paddingBottom={"4rem"}>

                    <Box
                        backgroundColor="primary.white"
                        boxShadow='lg'
                        alignItems="center"
                        padding="1rem"
                        borderRadius="35px"
                        maxH="100%"
                        w="100%"
                        textAlign="center"
                        top="0"
                    >
                        <Text fontSize="2.5rem" marginTop="5px" fontWeight="bold">
                            Host Account Requests
                        </Text>
                        <TableContainer /* padding=" 0 5px" */>
                            <Table variant='simple' size="sm">
                                <TableCaption>Most recent admin requests</TableCaption>
                                <Thead textAlign="center">
                                    <Tr>
                                        <Td fontWeight="bold">Name</Td>
                                        <Td fontWeight="bold">Phone Number</Td>
                                        <Td fontWeight="bold">Email</Td>
                                        <Td fontWeight="bold">Website</Td>
                                    </Tr>
                                </Thead>
                                <Tbody>

                                </Tbody>
                            </Table>

                        </TableContainer>

                        <Container aria-label="Page navigation " pos="fixed" bottom="0" right="0`">
                            <ul >
                                <li >
                                    <a href="#">{'<'}</a>
                                </li>
                                <li >
                                    <a href="#">{'>'}</a>
                                </li>
                            </ul>
                        </Container>
                    </Box>
                </Box>
                <Footer />
            </Box >
        </>
    );
};
export default adminRequests