import {
    Box,
    Select,
    Text,
    GridItem,
    Divider,
    IconButton,
    Input,
    HStack,
    TableContainer,
    Table,
    Thead,
    Tr,
    Td,
    FormLabel,
    FormControl
} from '@chakra-ui/react'
import {
    AiOutlineLeft,
    AiOutlineRight,
} from 'react-icons/ai'
import { TeamRanking } from '../../lib/models/teams'
import { Category } from '../../lib/models/category'
import { Children, useState } from 'react'

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
            return (
                team.Team.toLowerCase().includes(query) ||
                team.Rating.toString().toLowerCase().includes(query)
            )
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
                    borderRadius="35px"
                    minH='70vh'
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
                            <FormControl w="100%">
                                <FormLabel htmlFor="category-dropdown" srOnly>Category</FormLabel>
                                <Select
                                    id='category-dropdown'
                                    name='category-dropdown'
                                    borderRadius='full'
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
                            </FormControl>
                            <FormControl w="200%">
                                <FormLabel htmlFor="search-bar" srOnly>Search table...</FormLabel>
                                <Input
                                    id='search-bar'
                                    name='search-bar'
                                    borderRadius='full'
                                    placeholder="Search table..."
                                    onChange={(e: any) => search(e.target.value.toLowerCase())}
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
                                        </Tr>
                                        { Children.toArray(pages[pageIndex]?.map((rank, index) => 
                                            <Tr
                                                key={index}
                                            >
                                                <Td>{tableSize * pageIndex + index + 1}</Td>
                                                <Td>{rank.Team}</Td>
                                                <Td>{rank.Rating}</Td></Tr>
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
                                justifyContent='center'
                                w='100%'
                            >
                                <Text fontWeight='bold'>{pageIndex+1} of {pages.length}</Text>
                                <Box w='25%'/>
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
