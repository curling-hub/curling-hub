import {
    Box,
    Container,
    Flex,
    Select,
    Text,
    Grid,
    GridItem,
    Divider,
    IconButton,
    Input,
    HStack,
    TableContainer,
    Table,
    Thead,
    Tr,
    Td
} from '@chakra-ui/react'
import {
    AiOutlineLeft,
    AiOutlineRight,
    AiOutlineArrowUp,
    AiOutlineArrowDown
} from 'react-icons/ai'
import {
    MdHorizontalRule
} from 'react-icons/md'
import { TeamRanking } from '../../lib/models/teams'
import { Category } from '../../lib/models/category'
import { Children, useState } from 'react'
import Footer from '../footer/footer'
import { parse } from 'path'

interface RatingsBoxProps {
    teamRanking: TeamRanking[]
    categories: Category[]
    tableSize: number
}

export default function RatingsBox(props: RatingsBoxProps) {

    const {
        teamRanking = [],
        tableSize
    } = props
    
    const [pageIndex, setPageIndex] = useState(0)
    const [displayedRankings, setDisplayedRankings] = useState(teamRanking)
    const [fixedRankings, setFixedRankings] = useState(teamRanking)

    var i = 0
    var pages: Array<TeamRanking[]> = []
    for (i; i < Math.ceil(displayedRankings.length / tableSize); ++i) {
        pages[i] = displayedRankings.slice(i*tableSize, i*tableSize + tableSize)
    }
    
    const pageCount = pages.length
    
    function search(query: string) {
        const tables = fixedRankings.filter((team) => {
            return (team.Team.includes(query) || 
            team.Rating.toString().includes(query) ||
            team.Players.includes(query))
        })
        setDisplayedRankings(tables)
    }

    async function getSelectedMatches(selected: number) {
        if (Number.isNaN(selected)) {
            selected = 0
        }
        
        const req = {
            id: selected
        }
        
        const res = await fetch('/api/team/selected', {
            method: 'POST',
            body: new URLSearchParams(req as any).toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })

        if (res.status == 200 && res.body) {
            const result = await res.json()
            setDisplayedRankings(result.data)
            setFixedRankings(result.data)
        } else {
            const result = await res.json()
            alert("error: "+result.error)
        } 
    }

    return (
        <>
            <Box paddingBottom={"4rem"}>
                <Box
                    backgroundColor="primary.white"
                    display='flex'
                    flexDirection='column'
                    boxShadow='lg'
                    alignItems="center"
                    padding="1rem"
                    borderRadius="35px"
                    h='70vh'
                    maxW="100%"
                    textAlign="center"
                    marginLeft='4rem'
                    marginRight='4rem'
                    marginTop='2rem'
                >
                    <Text fontSize="2.5rem" marginTop="5px" fontWeight="bold">
                        Ratings
                    </Text>
                    <Box
                        w='80%'
                        height='100%'
                        justifyContent='start'
                    >
                        <HStack
                            spacing='2rem'
                        >
                            <Select
                                name='category-dropdown'
                                borderRadius='20px'
                                variant='filled'
                                color='black'
                                bg='gray.300'
                                w='100%'
                                onChange={async (e) => {
                                    await getSelectedMatches(parseInt(e.target.value))
                                }}
                            >
                                {
                                    props.categories.map((category) => {
                                        return (
                                            <option key={category.categoryId} value={category.categoryId}>{category.name}</option>
                                        )
                                    })
                                }
                            </Select>
                            <Input
                                name='search-bar'
                                borderRadius='20px'
                                w='200%'
                                placeholder="Search table..."
                                onChange={(e: any) => search(e.target.value)}
                            />
                        </HStack>
                        <TableContainer
                            marginTop="5px"
                            width='100%'
                            height='80%'
                        >
                            <Table
                                variant='simple'
                                size='sm'
                            >
                                <Thead textAlign='center'>
                                    <Tr>
                                        <Td fontWeight="bold">Position</Td>
                                        <Td fontWeight="bold">Team</Td>
                                        <Td fontWeight="bold">Rating</Td>
                                        <Td fontWeight="bold">Changes</Td>
                                        <Td fontWeight="bold">Players</Td>
                                    </Tr>
                                    { Children.toArray(pages[pageIndex]?.map((rank, index) => 
                                        <Tr
                                            key={index}
                                        >
                                            <Td>{tableSize * pageIndex + index + 1}</Td>
                                            <Td>{rank.Team}</Td>
                                            <Td>{rank.Rating}</Td>
                                            <RatingPaging changes={rank.Changes} />
                                            <Td>{rank.Players?.map((player) => {return (player + '  ')})}</Td>
                                        </Tr>
                                      ))
                                    }
                                </Thead>
                            </Table>
                        </TableContainer>
                        { pages.length > 1 &&
                            <Box
                                aria-label="Page navigation " 
                                display='flex'
                                flexDirection='row'
                                justifyContent='center'
                                w='100%'
                            >
                                <Text fontWeight='bold'>{pageIndex+1} of {pages.length}</Text>
                                <Box w='75%'/>
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
            </Box>
        </>
    )
}

interface ChangesProps {
    changes: number[] | null
}

const RatingPaging = (props: ChangesProps): JSX.Element => {
    const { changes} = props
    return (
        <>
            {
                changes && changes.length > 1 && changes[0] - changes[1] > 0 &&
                <Td>
                    <HStack>
                        <AiOutlineArrowUp
                            style={{ color: 'green' }}
                        />
                        <Text>{changes[0] - changes[1]}</Text>
                    </HStack>
                </Td> 
            }
            {
                changes && changes.length > 1 && changes[0] - changes[1] < 0 &&
                <Td>
                    <HStack>
                        <AiOutlineArrowDown
                            style={{ color: 'red' }}
                        />
                        <Text>{changes[0] - changes[1]}</Text>
                    </HStack>
                </Td> 
            }
            {
                changes && changes.length > 1 && changes[0] - changes[1] == 0 &&
                <Td>
                    <HStack>
                        <MdHorizontalRule
                            style={{ color: 'blue' }}
                        />
                        <Text>N/A</Text>
                    </HStack>
                </Td> 
            }
            {
                changes && changes.length < 2 &&
                <Td>
                    <HStack>
                        <MdHorizontalRule
                            style={{ color: 'blue' }}
                        />
                        <Text>N/A</Text>
                    </HStack>
                </Td> 
            }    
        </>
    )
}