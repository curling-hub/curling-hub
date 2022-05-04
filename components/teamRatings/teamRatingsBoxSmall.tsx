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
    AiOutlineCheck,
    AiOutlineClose
} from 'react-icons/ai'
import {
    MdHorizontalRule
} from 'react-icons/md'
import type { TeamMatches } from '../../lib/models/teams'
import { Filter } from '../../lib/models/match'
import { useState, Children } from 'react'
import { matchResultToString, matchResultOpponentTeamName } from '../../lib/utils/match'


interface teamRatingsBoxProps {
    teamMatches: TeamMatches[]
    filters: Filter[]
    tableSize: number
    teamId: number
}

export default function TeamRatingsBox(props: teamRatingsBoxProps) {

    const {
        teamId,
        teamMatches = [],
        filters,
        tableSize,
    } = props
    
    const [pageIndex, setPageIndex] = useState(0)
    const [displayedRankings, setDisplayedRankings] = useState(teamMatches)
    const [fixedRankings, setFixedRankings] = useState(teamMatches)

    var i = 0
    var pages: Array<TeamMatches[]> = []
    for (i; i < Math.ceil(displayedRankings.length / tableSize); ++i) {
        pages[i] = displayedRankings.slice(i*tableSize, i*tableSize + tableSize)
    }
    
    const pageCount = pages.length
    
    // Search function
    function search(query: string) {
        const tables = fixedRankings.filter((match) => {
            return (matchResultToString(teamId, match).toLowerCase().includes(query) || 
            match.host?.organization?.toLowerCase().includes(query) ||
            match.date?.toString().toLowerCase().includes(query) ||
            match.sheetOfIce?.toLowerCase().includes(query) ||
            match.comments?.toLowerCase().includes(query))
        })
        setDisplayedRankings(tables)
    }

    // use this to filter
    function filterMatches(selected: number) {  
        if (selected == 1) {
            const dates = fixedRankings.sort((m1, m2) => {
                return new Date(m1.date).getTime() - new Date(m2.date).getTime()
            })
            setDisplayedRankings(dates)
        }
        else if (selected == 2) {
            const dates = fixedRankings.sort((m1, m2) => {
                return new Date(m1.date).getTime() + new Date(m2.date).getTime()
            })
            setDisplayedRankings(dates)
        }
        else if (selected == 3) {
            const wins = fixedRankings.filter((match) => {
                const outcome = matchResultToString(teamId, match)
                return outcome === 'Win'
            })
            setDisplayedRankings(wins)
        }
        else if (selected == 4) {
            const losses = fixedRankings.filter((match) => {
                const outcome = matchResultToString(teamId, match)
                return outcome === 'Loss'
            })
            console.log(losses)
            setDisplayedRankings(losses)
        }
        else {
            const ties = fixedRankings.filter((match) => {
                const outcome = matchResultToString(teamId, match)
                return outcome === 'Tie'
            })
            setDisplayedRankings(ties)
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
                                    fontWeight='bold'
                                >
                                    Matches
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
                                        borderRadius='20px'
                                        variant='filled'
                                        color='black'
                                        bg='gray.300'
                                        onChange={(e) => {
                                            filterMatches(parseInt(e.target.value))
                                        }}
                                    >
                                        {
                                            filters.map((filter) => {
                                                return (
                                                    <option key={filter.filter_id} value={filter.filter_id}>{filter.value}</option>
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
                                    <Text fontWeight='bold'>Date</Text>
                                </GridItem>
                                <GridItem
                                    colStart={4}
                                >
                                    <Text fontWeight='bold'>Outcome</Text>
                                </GridItem>
                                <GridItem
                                    colStart={7}
                                >
                                    <Text fontWeight='bold'>Opponent</Text>
                                </GridItem>
                                { Children.toArray(pages[pageIndex]?.map((match, index) => (
                                    <>
                                        <GridItem
                                            colStart={1}
                                            colSpan={20}
                                        >
                                            <Divider orientation='horizontal' />
                                        </GridItem>
                                        <GridItem
                                            colStart={1}
                                        >
                                            <Text>{match.date}</Text>
                                        </GridItem>
                                        {
                                            matchResultToString(teamId, match) === 'Win' && 
                                            <GridItem
                                                colStart={4}
                                            >
                                                <Flex 
                                                    direction='row'
                                                >
                                                    <HStack 
                                                        spacing='5px'
                                                    >
                                                        <AiOutlineCheck
                                                            key={'arrow'}
                                                            style={{color: 'green'}}
                                                        />
                                                        <Text>{matchResultToString(teamId, match)}</Text>
                                                    </HStack>
                                                </Flex>
                                            </GridItem>
                                        }
                                        {
                                            matchResultToString(teamId, match) === 'Loss' && 
                                            <GridItem
                                                colStart={4}
                                            >
                                                <Flex 
                                                    direction='row'
                                                >
                                                    <HStack 
                                                        spacing='5px'
                                                    >
                                                        <AiOutlineClose
                                                            key={'arrow'}
                                                            style={{color: 'red'}}
                                                        />
                                                        <Text>{matchResultToString(teamId, match)}</Text>
                                                    </HStack>
                                                </Flex>
                                            </GridItem>
                                        }
                                        {
                                            matchResultToString(teamId, match) === 'Tie' &&
                                            <GridItem
                                                colStart={4}
                                            >
                                                <Flex 
                                                    direction='row'
                                                >
                                                    <HStack 
                                                        spacing='5px'
                                                    >
                                                        <MdHorizontalRule
                                                            key={'arrow'}
                                                            style={{color: 'blue'}}
                                                        />
                                                        <Text>{matchResultToString(teamId, match)}</Text>
                                                    </HStack>
                                                </Flex>
                                            </GridItem>
                                        }
                                        <GridItem
                                            colStart={7}
                                        >
                                            <Text>{matchResultOpponentTeamName(teamId, match)}</Text>
                                        </GridItem>
                                    </>
                            ))) }
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
