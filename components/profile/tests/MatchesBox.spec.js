import * as React from 'react'
import { mount } from '@cypress/react'
import { ChakraProvider } from '@chakra-ui/react'
import { TeamMatch } from '../../../lib/models/teams'
/* import { MatchesBox, MatchesTable, ProfileButton, SideBySideContainer } from '../../profile' */
import MatchesBox from '../MatchesBox'
import MatchesTable from '../MatchesTable'
import ProfileButton from '../ProfileButton'
import SideBySideContainer from '../SideBySideContainer'

/** @type {TeamMatch} */
const matches = [
    {
        date: '2022-04-30',
        matchId: 1,
        teamId1: 1,
        teamId2: 2,
        winner: 'team_id_1',
        hostId: 'id',
        host: {
            hostId: 'id',
            organization: 'Husky',
            website: 'http://example.com',
            phoneNumber: '(555) 555-5555',
            streetAddress: '',
            city: '',
            state: '',
            zip: '',
            country: '',
            status: 'accepted',
        },
        sheetOfIce: 'Sheet A',
        comments: 'wet ice',
        teams: [
            {
                teamId: 1,
                name: 'Team 1',
                rating: '',
            },
            {
                teamId: 2,
                name: 'Team 2',
                rating: '',
            },
        ]
    }
]

it('Team Profile Matches Table', () => {
    mount(
        <ChakraProvider>
            <SideBySideContainer>
                <MatchesBox
                    color="primary.white"
                    boxShadow='lg'
                >
                    <Text fontSize="2.5rem" marginTop="5px" fontWeight="bold">
                        Matches
                    </Text>
                    <MatchesTable teamMatches={matches} teamId={matches.teamId1} />
                    <Box marginTop="63px">
                        <Link href="/matches">
                            <ProfileButton buttonText='View Matches' color='primary.green' top="-20px" />
                        </Link>
                    </Box>
                </MatchesBox>
            </SideBySideContainer>
        </ChakraProvider>
    )
    cy.get('button').contains('View Matches').click()
})