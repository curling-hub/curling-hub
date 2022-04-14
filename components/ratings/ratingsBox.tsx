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
                                                    <option value={category.categoryId}>{category.name}</option>
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
                                    colStart={7}
                                >
                                    <Text fontWeight='bold'>Rating</Text>
                                </GridItem>
                                <GridItem
                                    colStart={9}
                                >
                                    <Text fontWeight='bold'>Type</Text>
                                </GridItem>
                                <GridItem
                                    colStart={11}
                                >
                                    <Text fontWeight='bold'>Changes</Text>
                                </GridItem>
                                <GridItem
                                    colStart={13}
                                >
                                    <Text fontWeight='bold'>Players</Text>
                                </GridItem>
                            </Grid>
                            {/* {teamRanking.map((rank) => (
                                <>
                                    <Divider orientation='horizontal' />
                                    <Grid key={`${rank.team_id}`} templateColumns='repeat(20, 1fr)'>
                                        <GridItem
                                            colStart={1}
                                        >
                                            <Text fontWeight='bold'>Position</Text>
                                        </GridItem>
                                        <GridItem
                                            colStart={3}
                                        >
                                            <Text fontWeight='bold'>{rank.team_name}</Text>
                                        </GridItem>
                                        <GridItem
                                            colStart={7}
                                        >
                                            <Text fontWeight='bold'>{rank.rating}</Text>
                                        </GridItem>
                                        <GridItem
                                            colStart={9}
                                        >
                                            <Text fontWeight='bold'>Type</Text>
                                        </GridItem>
                                        <GridItem
                                            colStart={11}
                                        >
                                            <Text fontWeight='bold'>Changes</Text>
                                        </GridItem>
                                        {
                                            rank.players.map((player, index) =>
                                                <GridItem
                                                    key={index}
                                                    colStart={13 + index}
                                                >
                                                    <Text fontWeight='bold'>player</Text>
                                                </GridItem>
                                            )
                                        }

                                    </Grid>
                                </>
                            ))} */}
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
                                            1 of 100
                                        </Text>
                                    </Flex>
                                </GridItem>
                                <GridItem
                                    colStart={18}
                                >
                                    <IconButton
                                        aria-label='page-left'
                                        icon={<AiOutlineLeft />}
                                    />
                                </GridItem>
                                <GridItem
                                    colStart={19}
                                >
                                    <IconButton
                                        aria-label='page-right'
                                        icon={<AiOutlineRight />}
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