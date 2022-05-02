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

export default function RatingsBoxSmall(props: RatingsBoxProps) {

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
                                        name="category-dropdown"
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
                                        name="search-bar"
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
                                { pages[pageIndex]?.map((rank, index) => (
                                    <RatingPaging
                                        rank={rank}
                                        tableSize={tableSize}
                                        pageIndex={pageIndex}
                                        index={index}
                                        key={`${rank.ID}`}
                                    />
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


interface RatingPagingProps {
    rank: TeamRanking
    tableSize: number
    pageIndex: number
    index: number
}

const RatingPaging = (props: RatingPagingProps): JSX.Element => {
    const { rank, tableSize, pageIndex, index } = props
    return (
        <>
            <GridItem
                key={'a-' + rank.ID.toString()}
                colStart={1}
                colSpan={20}
            >
                <Divider key={'b-' + rank.ID.toString()} orientation='horizontal' />
            </GridItem>
            <GridItem
                key={'c-' + rank.ID.toString()}
                colStart={1}
            >
                <Text key={'d-' + rank.ID.toString()}>{tableSize * pageIndex + index + 1}</Text>
            </GridItem>
            <GridItem
                key={'e-' + rank.ID.toString()}
                colStart={3}
                colSpan={3}
            >
                <Text key={'f-' + rank.ID.toString()}>{rank.Team}</Text>
            </GridItem>
            <GridItem
                key={'g-' + rank.ID.toString()}
                colStart={8}
            >
                <Text key={'h-' + rank.ID.toString()}>{rank.Rating}</Text>
            </GridItem>
        </>
    )
}
