import {
    Box,
    Container,
    Flex,
    Select,
    Text,
    Grid,
    GridItem,
    Divider,
    IconButton
} from '@chakra-ui/react'
import {
    AiOutlineLeft,
    AiOutlineRight
} from 'react-icons/ai'
import { TeamRanking } from '../../lib/models/teams'
import { Category } from '../../lib/models/category'
import { useState } from 'react'
import { floor } from 'lodash'

interface TeamTable {
    position: number,
    team: string,
    rating: string,
    type: string,
    changes: number,
    players: Array<string>
}

interface RatingsBoxProps {
    teamRanking: TeamRanking[]
    categories: Category[]
}

export default function RatingsBox(props: RatingsBoxProps) {

    const {
        teamRanking = []
    } = props

    const [pageIndex, setPageIndex] = useState(0)

    const tableSize = 5
    var pages: Array<TeamRanking[]> = []
    var i = 0
    for (i; i < floor(teamRanking.length / tableSize); ++i) {
        pages[i] = teamRanking.slice(i*tableSize, i*tableSize + tableSize)
    } if (teamRanking.length % tableSize > 0) {
        pages[i] = teamRanking.slice(i*tableSize, i*tableSize + (teamRanking.length % tableSize))
    }
    const pageCount = pages.length

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
                                        placeholder="All Teams"
                                        borderRadius='20px'
                                        variant='filled'
                                        color='black'
                                        bg='gray.300'
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
                                    <Select
                                        borderRadius='20px'
                                        placeholder="Search table..."
                                    >
                                    </Select>
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
                                >
                                    <Text fontWeight='bold'>Type</Text>
                                </GridItem>
                                <GridItem
                                    colStart={12}
                                >
                                    <Text fontWeight='bold'>Changes</Text>
                                </GridItem>
                                <GridItem
                                    colStart={14}
                                >
                                    <Text fontWeight='bold'>Players</Text>
                                </GridItem>
                                { pages[pageIndex].map((rank, index) => (
                                    <>
                                        <GridItem
                                            key={rank.team_id+1}
                                            colStart={1}
                                            colSpan={20}
                                        >
                                            <Divider key={rank.team_id+2} orientation='horizontal' />
                                        </GridItem>
                                        <GridItem
                                            key={rank.team_id+3}
                                            colStart={1}
                                        >
                                            <Text key={rank.team_id+9}>{index+1}</Text>
                                        </GridItem>
                                        <GridItem
                                            key={rank.team_id+4}
                                            colStart={3}
                                            colSpan={3}
                                        >
                                            <Text key={rank.team_id+10}>{rank.team_name}</Text>
                                        </GridItem>
                                        <GridItem
                                            key={rank.team_id+5}
                                            colStart={8}
                                        >
                                            <Text key={rank.team_id+11}>{rank.rating}</Text>
                                        </GridItem>
                                        <GridItem
                                            key={rank.team_id+6}
                                            colStart={10}
                                        >
                                            <Text key={rank.team_id+12}>Type</Text>
                                        </GridItem>
                                        <GridItem
                                            key={rank.team_id+7}
                                            colStart={12}
                                        >
                                            <Text key={rank.team_id+13}>Changes</Text>
                                        </GridItem> 
                                        <GridItem
                                            key={rank.team_id+8}
                                            colStart={14}
                                            colSpan={6}
                                        >
                                            <Text key={rank.team_id+14}>{rank.players}</Text>
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