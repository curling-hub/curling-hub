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
    HStack
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
import { useState } from 'react'

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
            body: JSON.stringify(req),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
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
            <Container maxW="2xl" centerContent>
                <Box
                    minW="sm"
                    maxW={{ base: "sm", md: "none" }}
                    w="100vh"
                    h="80vh"
                    my="4"
                    borderRadius="20"
                    bg="white"
                    shadow="md"
                >
                    <Grid
                        templateColumns='repeat(10, 1fr)'
                        templateRows='repeat(10, 1fr)'
                        h="100%"
                    >
                        <GridItem
                            colSpan={10}
                        >
                            <Flex
                                flexDirection="row"
                                justify='center'
                            >
                                <Text
                                    fontSize="4xl"
                                >
                                    Ratings
                                </Text>
                            </Flex>
                        </GridItem>
                        <GridItem
                            colSpan={10}
                        >
                            <Grid
                                templateColumns='repeat(10, 1fr)'
                            >
                                <GridItem
                                    colSpan={2}
                                    colStart={2}
                                >
                                    <Select
                                        name='category-dropdown'
                                        placeholder="All Teams"
                                        borderRadius='20px'
                                        variant='filled'
                                        color='black'
                                        bg='gray.300'
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
                                </GridItem>
                                <GridItem
                                    colSpan={5}
                                    colStart={5}
                                >
                                    <Input
                                        name='search-bar'
                                        borderRadius='20px'
                                        placeholder="Search table..."
                                        onChange={(e: any) => search(e.target.value)}
                                    >
                                    </Input>
                                </GridItem>
                            </Grid>
                        </GridItem>
                        <GridItem
                            rowSpan={7}
                            colSpan={8}
                            colStart={2}
                        >
                            <Grid
                                templateColumns='repeat(20, 1fr)'
                            >
                                <GridItem
                                    colStart={1}
                                >
                                    <Text fontWeight='bold'>Position</Text>
                                </GridItem>
                                <GridItem
                                    colStart={3}
                                >
                                    <Text fontWeight='bold'>Team</Text>
                                </GridItem>
                                <GridItem
                                    colStart={8}
                                >
                                    <Text fontWeight='bold'>Rating</Text>
                                </GridItem>
                                <GridItem
                                    colStart={10}
                                    colSpan={3}
                                >
                                    <Text fontWeight='bold'>Changes</Text>
                                </GridItem>
                                <GridItem
                                    colStart={13}
                                >
                                    <Text fontWeight='bold'>Players</Text>
                                </GridItem>
                                { pages[pageIndex]?.map((rank, index) => (
                                    <>
                                        <GridItem
                                            key={'divider'+rank.ID.toString()}
                                            colStart={1}
                                            colSpan={20}
                                        >
                                            <Divider key={'dividerVal'+rank.ID.toString()} orientation='horizontal' />
                                        </GridItem>
                                        <GridItem
                                            key={'size'+rank.ID.toString()}
                                            colStart={1}
                                        >
                                            <Text key={'sizeVal'+rank.ID.toString()}>{tableSize*pageIndex + index+1}</Text>
                                        </GridItem>
                                        <GridItem
                                            key={'team'+rank.ID.toString()}
                                            colStart={3}
                                            colSpan={3}
                                        >
                                            <Text key={'teamVal'+rank.ID.toString()}>{rank.Team}</Text>
                                        </GridItem>
                                        <GridItem
                                            key={'rating'+rank.ID.toString()}
                                            colStart={8}
                                        >
                                            <Text key={'ratingVal'+rank.ID.toString()}>{rank.Rating}</Text>
                                        </GridItem>
                                        {
                                            rank.Changes && rank.Changes.length >= 2 &&
                                            (rank.Changes[0] - rank.Changes[1]) > 0 &&
                                            <GridItem
                                                key={'changes1'+rank.ID.toString()}
                                                colStart={10}
                                                colSpan={3}
                                            >
                                                <Flex 
                                                    key={'flex'+rank.ID.toString()}
                                                    direction='row'
                                                >
                                                    <HStack 
                                                        key={'HStack'+rank.ID.toString()}
                                                        spacing='5px'
                                                    >
                                                        <AiOutlineArrowUp 
                                                            key={'arrow'+rank.ID.toString()}
                                                            style={{color: 'green'}}
                                                        />
                                                        <Text key={'changesVal1'+rank.ID.toString()}>{rank.Changes[0] - rank.Changes[1]}</Text>
                                                    </HStack>
                                                </Flex>
                                            </GridItem> 
                                        }
                                        {
                                            rank.Changes && rank.Changes.length >= 2 &&
                                            (rank.Changes[0] - rank.Changes[1]) < 0 &&
                                            <GridItem
                                                key={'changes2'+rank.ID.toString()}
                                                colStart={10}
                                                colSpan={3}
                                            >
                                                <Flex 
                                                    key={'flex'+rank.ID.toString()}
                                                    direction='row'
                                                >
                                                    <HStack 
                                                        key={'HStack'+rank.ID.toString()}
                                                        spacing='5px'
                                                    >
                                                        <AiOutlineArrowDown 
                                                            key={'arrow'+rank.ID.toString()}
                                                            style={{color: 'red'}}
                                                        />
                                                        <Text key={'changesVal2'+rank.ID.toString()}>{rank.Changes[0] - rank.Changes[1]}</Text>
                                                    </HStack>
                                                </Flex>
                                            </GridItem>
                                        }
                                        {
                                            rank.Changes && rank.Changes.length < 2 &&
                                            <GridItem
                                                key={'changes3'+rank.ID.toString()}
                                                colStart={10}
                                                colSpan={3}
                                            >
                                                <Flex 
                                                    key={'flex'+rank.ID.toString()}
                                                    direction='row'
                                                >
                                                    <HStack 
                                                        key={'HStack'+rank.ID.toString()}
                                                        spacing='5px'
                                                    >
                                                        <MdHorizontalRule 
                                                            key={'arrow'+rank.ID.toString()}
                                                            style={{color: 'blue'}}
                                                        />
                                                        <Text key={'changesVal3'+rank.ID.toString()}>N/A</Text>
                                                    </HStack>
                                                </Flex>
                                            </GridItem>
                                        }
                                        {
                                            !rank.Changes && 
                                            <GridItem
                                                key={'changes4'+rank.ID.toString()}
                                                colStart={10}
                                                colSpan={3}
                                            >
                                                <Flex 
                                                    key={'flex'+rank.ID.toString()}
                                                    direction='row'
                                                >
                                                    <HStack 
                                                        key={'HStack'+rank.ID.toString()}
                                                        spacing='5px'
                                                    >
                                                        <AiOutlineArrowUp 
                                                            key={'arrow'+rank.ID.toString()}
                                                            style={{color: 'green'}}
                                                        />
                                                        <Text key={'changesVal4'+rank.ID.toString()}>N/A</Text>
                                                    </HStack>
                                                </Flex>
                                            </GridItem>
                                        }
                                        <GridItem
                                            key={'players'+rank.ID.toString()}
                                            colStart={13}
                                            colSpan={6}
                                        >
                                            <Text key={'playersVal'+rank.ID.toString()}>{rank.Players}</Text>
                                        </GridItem>
                                    </>
                            )) }
                            </Grid>
                           
                        </GridItem>
                        <GridItem
                            colSpan={10}
                        >
                            <Grid
                                templateColumns='repeat(20, 1fr)'
                            >
                                <GridItem
                                    colStart={2}
                                    colSpan={3}
                                    justifyContent='center'
                                >
                                    <Flex
                                        flexDirection="column"
                                        justifyContent="center"
                                        h='100%'
                                    >
                                        <Text
                                            fontWeight='bold'
                                            justifyItems='center'
                                        >
                                            {pageIndex+1} of {pageCount}
                                        </Text>
                                    </Flex>
                                </GridItem>
                                <GridItem
                                    colStart={18}
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
                                </GridItem>
                                <GridItem
                                    colStart={19}
                                >
                                    <IconButton
                                        aria-label='page-right'
                                        icon={<AiOutlineRight />}
                                        onClick={() => {
                                            if (pageIndex + 1 < pageCount) {
                                                setPageIndex(pageIndex+1)
                                            }
                                        }}
                                    />
                                </GridItem>
                            </Grid>
                        </GridItem>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}