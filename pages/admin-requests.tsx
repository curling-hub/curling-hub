import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Footer from "../components/footer/footer";
import {
    Tabs, 
    TabList, 
    Tab,
    Box,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Td,
    TableContainer,
    Button,
    HStack,
    IconButton,
    useMediaQuery,
} from '@chakra-ui/react'
import { getPendingHosts } from '../lib/handlers/hosts'
import { useState, Children, useEffect } from 'react'
import { HostInfo } from '../lib/models'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import AdminLayout from '../components/layouts/AdminLayout'
import { getSession } from '../lib/auth/session'
import { serverSideRedirectTo } from '../lib/auth/redirect'
import { AccountType } from '../lib/models/accountType'
import HostInfoModal from '../components/modals/HostInfoModal'

interface ReqProps {
    hosts: HostInfo[]
}

const AdminRequests: NextPage<ReqProps> = (props: ReqProps) => {
    const [hosts, setHosts] = useState(props.hosts)
    const [modalHost, setModalHost] = useState(props.hosts[0])
    const [pageIndex, setPageIndex] = useState(0)
    const [tabIndex, setTabIndex] = useState(0)
    const [refreshKey, setRefreshKey] = useState(0)
    const [isSmallScreen] = useMediaQuery("(max-width: 1000px)")
    const [isTinyScreen] = useMediaQuery("(max-width: 465px)")
    const [modalState, setModalState] = useState(false)
    
    const tableSize = isSmallScreen ? 4 : 13

    var pages: Array<HostInfo[]> =  []
    for (let i=0;i < Math.ceil(hosts.length / tableSize); ++i) {
        pages[i] = hosts.slice(i*tableSize, i*tableSize+tableSize)
    }
    const pageCount = pages.length

    async function updateHostStatus(id: string, newStatus: string) {
        const req = {
            hostId: id,
            newStatus: newStatus
        }
        
        await fetch('/api/host/update', {
            body: JSON.stringify(req),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })

        setRefreshKey(refreshKey+1)
    }

    useEffect(() => {
       const req = {
           id: tabIndex
       }
       
       fetch('/api/host/info', {
           body: JSON.stringify(req),
           headers: {
               'Content-Type': 'application/json'
           },
           method: 'POST'
       }).then((res) => {
            if (res.status == 200) {
                res.json().then((result) => setHosts(result.data))
            }
       }).catch((e: any) => console.log(e))
    }, [tabIndex, refreshKey])
    
    return (
        <>
            <Head>
                <title>Admin Requests | Curlo</title>
            </Head>
            <Box
                position="absolute"
                w="100%"
                minH="100%"
                bgGradient="linear-gradient(primary.purple, primary.white)"
            >
            <AdminLayout/>
                <Box 
                    paddingBottom="4rem"
                >
                    <Box
                        backgroundColor="primary.white"
                        display='flex'
                        flexDirection='column'
                        boxShadow='lg'
                        alignItems="center"
                        padding="1rem"
                        borderRadius="35px"
                        h="80vh"
                        maxW="100%"
                        textAlign="center"
                        top="0"
                        marginLeft={isSmallScreen ? '1rem' : '4rem'}
                        marginRight={isSmallScreen ? '1rem' : '4rem'}
                        overflow='auto'
                    >
                        <Text fontSize={isSmallScreen ? '1.5rem' : '2.5rem'} marginTop="5px" fontWeight="bold">
                            Host Account Requests
                        </Text>
                        <Box
                            display='flex'
                            flexDir='row'
                            alignItems='start'
                            w={isSmallScreen ? '100%' : '80%'}
                        >
                            <Tabs 
                                size={isSmallScreen ? 'sm' : 'md'}
                                marginTop="5px" 
                                variant='soft-rounded' 
                                onChange={(index) => {
                                    setHosts([])
                                    setTabIndex(index)
                                }}
                            >
                                <TabList>
                                    <Tab 
                                        _selected={{color: 'black',
                                                    fontWeight: 'bold',
                                                    bg: 'primary.green',
                                                    border: 'green'
                                        }}
                                        name='pending-tab'
                                        color='black'
                                    >Pending</Tab>
                                    <Tab
                                        _selected={{color: 'black',
                                                    fontWeight: 'bold',
                                                    bg: 'primary.green',
                                                    border: 'green'
                                        }}
                                        name='accepted-tab'
                                        color='black'
                                    >Accepted</Tab>
                                    <Tab 
                                        _selected={{color: 'black',
                                                    fontWeight: 'bold',
                                                    bg: 'primary.green',
                                                    border: 'green'
                                        }}
                                        name='rejected-tab'
                                        color='black'
                                    >Rejected</Tab>
                                </TabList>
                            </Tabs>
                        </Box>
                        <Box
                            display='flex'
                            flexDir='column'
                            w={isSmallScreen ? '100%' : '80%'}
                            h='80%'
                            marginTop='1%'
                        >
                            <TableContainer 
                                marginTop="5px"
                                width='100%'
                                height='100%'
                            >
                                <Table 
                                    variant='simple' 
                                    size="sm"
                                >
                                    <Thead textAlign="center">
                                        <Tr>
                                            <Td fontWeight="bold">Host Info</Td>
                                            {!isTinyScreen && !isSmallScreen && <Td fontWeight="bold">Phone Number</Td>}
                                            {!isTinyScreen && !isSmallScreen && <Td fontWeight="bold">Email</Td>}
                                            {!isTinyScreen && !isSmallScreen && <Td fontWeight="bold">Website</Td>}
                                            { tabIndex == 0 && <Td></Td>}
                                        </Tr>
                                        {Children.toArray(pages[pageIndex]?.map((host: HostInfo, index) => 
                                        <>
                                            <Tr
                                                key={index}
                                            >
                                                {isTinyScreen && 
                                                    <Td>
                                                        <Button
                                                            onClick={() => {
                                                                setModalHost(host)
                                                                setModalState(!modalState)
                                                            }
                                                            }
                                                        >
                                                            Reveal
                                                        </Button>
                                                    </Td>
                                                }
                                                {!isTinyScreen && !isSmallScreen && <Td>{host.organization}</Td>}
                                                {!isTinyScreen && !isSmallScreen && <Td>{host.phoneNumber}</Td>}
                                                {!isTinyScreen && !isSmallScreen && <Td>{host.email}</Td>}
                                                {!isTinyScreen && !isSmallScreen && <Td>{host.website}</Td>}
                                                { tabIndex == 0 &&
                                                    <Td>
                                                        <HStack
                                                            spacing={4}
                                                        >
                                                            <Button
                                                                colorScheme='green'
                                                                borderRadius='30px'
                                                                size='sm'
                                                                color='black'
                                                                onClick={async () => {await updateHostStatus(host.hostId, 'accepted')}}
                                                            >
                                                                Accept
                                                            </Button>
                                                            <Button
                                                                colorScheme='red'
                                                                borderRadius='30px'
                                                                size='sm'
                                                                color='black'
                                                                onClick={async () => {await updateHostStatus(host.hostId, 'rejected')}}
                                                            >
                                                                Reject
                                                            </Button>
                                                        </HStack>
                                                    </Td>
                                                }
                                            </Tr>
                                            </>
                                        ))}
                                    </Thead>
                                    <Tbody>

                                    </Tbody>
                                </Table>    
                            </TableContainer>
                            {pages.length > 1 && 
                                <Box
                                    aria-label="Page navigation " 
                                    display='flex'
                                    flexDirection='row'
                                    justifyContent='space-between'
                                    marginTop='5px'
                                >
                                        <Text fontWeight='bold'>{pageIndex+1} of {pages.length}</Text>
                                        
                                        <HStack
                                            spacing={2}
                                        >   
                                            <IconButton
                                                    aria-label='page-left'
                                                    icon={<AiOutlineLeft />}
                                                    onClick={() => {
                                                        if (pageIndex + 1 > 1) {
                                                            setPageIndex(pageIndex-1)
                                                        }
                                                    }}
                                            />
                                            <IconButton
                                                    aria-label='page-right'
                                                    icon={<AiOutlineRight />}
                                                    onClick={() => {
                                                        if (pageIndex + 1 < pageCount) {
                                                            setPageIndex(pageIndex+1)
                                                        }
                                                    }}
                                            />
                                        </HStack>
                                </Box>
                            }
                        </Box>
                    </Box>
                    <HostInfoModal
                        isOpen={modalState}
                        onClose={() => setModalState(!modalState)}
                        name={modalHost?.organization}
                        email={modalHost?.email}
                        phoneNumber={modalHost?.phoneNumber}
                        website={modalHost?.website}
                    />
                </Box>
                <Footer />
            </Box >
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const hosts = await getPendingHosts()
    const sessionWrapper = await getSession(context)
    const session = sessionWrapper.session

    if (!session || session.user.account_type != AccountType.ADMIN) {
        return serverSideRedirectTo('/')
    }

    return {
        props: {
            hosts: hosts
        }
    }
}

export default AdminRequests