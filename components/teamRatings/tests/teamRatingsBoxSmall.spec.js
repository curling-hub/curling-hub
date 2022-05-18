import * as React from 'react'
import { mount } from '@cypress/react'
import { ChakraProvider } from '@chakra-ui/react'
import { TeamMatch } from '../../../lib/models/teams'
import TeamRatingsBoxSmall from '../teamRatingsBoxSmall'

const filters = [
    {filter_id: 1, value: "Most Recent"},
    {filter_id: 2, value: "Oldest"},
    {filter_id: 3, value: "Wins"},
    {filter_id: 4, value: "Losses"},
    {filter_id: 5, value: "Ties"}
]

/** @type {TeamMatch[]} */
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

it('New Team Page', () => {
    mount(
        <ChakraProvider>
            <TeamRatingsBoxSmall
                teamMatches={matches}
                filters={filters}
                tableSize={20}
                teamId={1}
            />
        </ChakraProvider>
    )
    cy.get('[name="search-bar"]').type('1200')
    cy.get('[name="category-dropdown"]').select(3)
})