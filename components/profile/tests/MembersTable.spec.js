import * as React from 'react'
import { mount } from '@cypress/react'
import { ChakraProvider, VStack } from '@chakra-ui/react'
import { TeamWithMembersAndRatings } from '../../../lib/models/teams'
import { Category, TeamMember } from '../../../lib/models'
import { ProfileButton, SideBySideContainer, LeftHandBox } from '../../profile'

/** @type {TeamWithMembersAndRatings} */
const teamInfo =
{
    teamId: 1,
    name: "Test Team Name",
    rating: "9001",
    members: ["Team_Member_1", "Team_Member_2", "Team_Member_3", "Team_Member_4"],
    teamGlickoInfo: {
        teamId: 1,
        rating: 9001,
        ratingDeviation: 264.91,
        volatility: 1,
    },
    ratingPeriods: {
        ratingPeriodId: 1,
        name: "Test Rating Period",
        startDate: '2022-04-30',
        endDate: '2022-05-10',
        teamGlickoInfo: {
            teamId: 1,
            rating: 9001,
            ratingDeviation: 264.91,
            volatility: 1,
        }
    }
}


/** @type {Category[]} */
const teamCategory = [
    {
        categoryId: "Id_1",
        name: "First Category",
    },
    {
        categoryId: "Id_2",
        name: "Second Category",
    }
]

/** @type {TeamMember[]} */
const members = [
    {
        memberId: 1,
        teamId: 1,
        name: "Team_Member_1",
        email: "Team_Member_1@test.mail"
    },
    {
        memberId: 2,
        teamId: 1,
        name: "Team_Member_2",
        email: "Team_Member_2@test.mail"
    },
    {
        memberId: 3,
        teamId: 1,
        name: "Team_Member_3",
        email: "Team_Member_3@test.mail"
    },
    {
        memberId: 4,
        teamId: 1,
        name: "Team_Member_4",
        email: "Team_Member_4@test.mail"
    },
]

const email = "Test_Team@test.mail"

it('Team Profile Members Table', () => {
    mount(
        <ChakraProvider>
            <SideBySideContainer height='1022px'>
                <VStack spacing="78px" height="100%">
                    <LeftHandBox color='primary.white'>
                        <VStack spacing="0px" h="356px">
                            {teamInfo && (
                                <Text
                                    fontSize="2.5em"
                                    fontWeight="bold"
                                >
                                    {teamInfo.name}
                                </Text>
                            )}
                            <Text
                                fontSize="1.5em"
                                fontWeight="bold"
                            >
                                Contact
                            </Text>
                            <Text>
                                {email}
                            </Text>
                            <MembersTable teamMembers={members} teamCategories={teamCategory} />
                        </VStack>
                        <ProfileButton buttonText='Edit' color='primary.gray' />
                    </LeftHandBox>
                    <LeftHandBox color='primary.green'>
                        <VStack>
                            <Text
                                fontSize="2.5em"
                                fontWeight="bold"
                            >
                                Rating
                            </Text>
                            {teamInfo && (
                                <Text
                                    fontSize="6em"
                                    fontWeight="bold"
                                >
                                    {teamInfo.teamGlickoInfo?.rating}
                                </Text>
                            )}
                        </VStack>
                    </LeftHandBox>
                </VStack>
            </SideBySideContainer>
        </ChakraProvider>
    )
    cy.get('button').contains('Edit').click()
})