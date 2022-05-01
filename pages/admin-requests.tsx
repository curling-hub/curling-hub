import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import TeamLayout from '../components/layouts/TeamLayout'
import Footer from "../components/footer/footer";
import {
    Tabs, 
    TabList, 
    TabPanels, 
    Tab,
    TabPanel,
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
    Button,
    HStack,
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
import { useState, Children } from 'react';
import { HostInfo } from '../lib/models';
import { string } from 'yup';

interface hosts {
    email: string,
    organization: string,
    website: string,
    phoneNumber: string
}

const adminRequests: NextPage = () => {
    const [hosts, setHosts] = useState([])
    console.log(hosts)
    async function getHosts(index: number) {
       const req = {
           id: index
       }
       
       const res = await fetch('/api/host/info', {
           body: JSON.stringify(req),
           headers: {
               'Content-Type': 'application/json'
           },
           method: 'POST'
       })
       
       if (res.status == 200 && res.body) {
           const result = await res.json()
           const hosts = result.data.map((host: HostInfo) => { return ({    
               organization: host.organization,
               email: host.user?.email,
               website: host.website,
               phoneNumber: host.phoneNumber
           })})
           console.log(hosts)
           setHosts(hosts)
       } else {
           const result = await res.json()
           alert("error: "+result.error)
           setHosts([])
       } 
    }
    
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
                        <Tabs 
                            marginTop="5px" 
                            variant='soft-rounded' 
                            align='center'
                            onChange={async (index) => {await getHosts(index)}}
                        >
                            <TabList>
                                <Tab 
                                    _selected={{color: 'black',
                                                fontWeight: 'bold',
                                                bg: 'primary.green',
                                                border: 'green'
                                    }}
                                    color='black'
                                >Pending</Tab>
                                <Tab
                                    _selected={{color: 'black',
                                                fontWeight: 'bold',
                                                bg: 'primary.green',
                                                border: 'green'
                                    }}
                                    color='black'
                                >Accepted</Tab>
                                <Tab 
                                    _selected={{color: 'black',
                                                fontWeight: 'bold',
                                                bg: 'primary.green',
                                                border: 'green'
                                    }}
                                    color='black'
                                >Rejected</Tab>
                            </TabList>
                        </Tabs>
                        <TableContainer marginTop="5px"/* padding=" 0 5px" */>
                            <Table variant='simple' size="sm">
                                <TableCaption>Most recent admin requests</TableCaption>
                                <Thead textAlign="center">
                                    <Tr>
                                        <Td fontWeight="bold">Name</Td>
                                        <Td fontWeight="bold">Phone Number</Td>
                                        <Td fontWeight="bold">Email</Td>
                                        <Td fontWeight="bold">Website</Td>
                                        <Td></Td>
                                    </Tr>
                                    { Children.toArray(hosts?.map((host: hosts) => 
                                        <Tr>
                                            <Td fontWeight="bold">{host.organization}</Td>
                                            <Td fontWeight="bold">{host.phoneNumber}</Td>
                                            <Td fontWeight="bold">{host.email}</Td>
                                            <Td fontWeight="bold">{host.website}</Td>
                                            <Td>
                                                <HStack
                                                    spacing={4}
                                                >
                                                    <Button
                                                        colorScheme='green'
                                                        borderRadius='30px'
                                                        size='sm'
                                                        color='black'
                                                    >
                                                        Accept
                                                    </Button>
                                                    <Button
                                                        colorScheme='red'
                                                        borderRadius='30px'
                                                        size='sm'
                                                        color='black'
                                                    >
                                                        Reject
                                                    </Button>
                                                </HStack>
                                            </Td>
                                        </Tr>
                                    ))}
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