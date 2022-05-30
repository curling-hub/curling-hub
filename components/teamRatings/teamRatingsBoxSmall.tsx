import {
    Box,
    Flex,
    Select,
    Text,
    Input,
    HStack,
    TableContainer,
    Table,
    Thead,
    Td,
    Tr,
    IconButton,
    FormLabel,
    FormControl
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
import type { TeamMatch } from '../../lib/models/teams'
import { Filter } from '../../lib/models/match'
import { useState, Children } from 'react'
import { matchResultToString, matchResultOpponentTeamName } from '../../lib/utils/match'


interface teamRatingsBoxProps {
    teamMatches: TeamMatch[]
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
    var pages: Array<TeamMatch[]> = []
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
            setDisplayedRankings(fixedRankings)
        }
        else if (selected == 2) {
            const oldDates = [...fixedRankings]
            const dates = oldDates.sort((m1, m2) => {
                return new Date(m1.date).getTime() - new Date(m2.date).getTime()
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
            <Box
                backgroundColor="primary.white"
                display='flex'
                flexDirection='column'
                boxShadow='lg'
                alignItems="center"
                borderRadius="35px"
                maxW="100%"
                minH='70vh'
                textAlign="center"
                marginLeft='4rem'
                marginRight='4rem'
                marginTop='2rem'
            >
                <Text fontSize="2.5rem" marginTop="5px" fontWeight="bold">
                    Matches
                </Text>
                <Box
                    w='80%'
                    justifyContent='start'
                >
                    <HStack
                        spacing='2rem'
                    >
                        <FormControl w="100%">
                            <FormLabel htmlFor="category-dropdown" srOnly>Category</FormLabel>
                            <Select
                                id='category-dropdown'
                                name='category-dropdown'
                                borderRadius='full'
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
                        </FormControl>
                        <FormControl w="200%">
                            <FormLabel htmlFor="search-bar" srOnly>Search table...</FormLabel>
                            <Input
                                id='search-bar'
                                name='search-bar'
                                borderRadius='full'
                                placeholder="Search table..."
                                onChange={(e: any) => search(e.target.value)}
                            />
                        </FormControl>
                    </HStack>
                    <Box 
                        minH='50vh'
                    >
                        <TableContainer
                            aria-label='table'
                            marginTop="5px"
                            width='100%'
                        >
                            <Table
                                variant='simple'
                                size='sm'
                            >
                                <Thead textAlign='center'>
                                    <Tr>
                                        <Td fontWeight="bold">Date</Td>
                                        <Td fontWeight="bold">Outcome</Td>
                                        <Td fontWeight="bold">Opponent</Td>
                                    </Tr>
                                    { Children.toArray(pages[pageIndex]?.map((match, index) => 
                                        <Tr
                                            key={index}
                                        >
                                            <Td>{match.date}</Td>
                                            <Td>
                                            {
                                                matchResultToString(teamId, match) == 'Win' &&
                                                <Flex 
                                                    direction='row'
                                                >
                                                    <HStack 
                                                        spacing='5px'
                                                    >
                                                        <AiOutlineCheck
                                                            aria-labelledby='win'
                                                            key={'arrow'}
                                                            style={{color: 'green'}}
                                                        />
                                                        <Text id="win">Win</Text>
                                                    </HStack>
                                                </Flex>
                                            }
                                            {
                                                matchResultToString(teamId, match) == 'Loss' &&
                                                <Flex 
                                                    direction='row'
                                                >
                                                    <HStack 
                                                        spacing='5px'
                                                    >
                                                        <AiOutlineClose
                                                            aria-labelledby='loss'
                                                            key={'arrow'}
                                                            style={{color: 'red'}}
                                                        />
                                                        <Text id="loss">Loss</Text>
                                                    </HStack>
                                                </Flex>
                                            }
                                            {
                                                matchResultToString(teamId, match) == 'Tie' &&
                                                <Flex 
                                                    direction='row'
                                                >
                                                    <HStack 
                                                        spacing='5px'
                                                    >
                                                        <MdHorizontalRule
                                                            aria-labelledby='tie'
                                                            key={'arrow'}
                                                            style={{color: 'blue'}}
                                                        />
                                                        <Text id="tie">Tie</Text>
                                                    </HStack>
                                                </Flex>
                                            }
                                            </Td>
                                            <Td>{matchResultOpponentTeamName(teamId, match)}</Td>
                                        </Tr>
                                    ))
                                    }
                                </Thead>
                            </Table>
                        </TableContainer>
                    </Box>
                    { pages.length > 1 &&
                            <Box
                                aria-label="Page navigation " 
                                display='flex'
                                flexDirection='row'
                                justifyContent='space-between'
                                w='100%'
                                marginBottom='5px'
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
        </>
    )
}
