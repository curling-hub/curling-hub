import * as React from 'react'
import { mount } from '@cypress/react'
import { ChakraProvider } from '@chakra-ui/react'
import TeamRatingsBox from '../teamRatingsBox'

const filters = [
    {filter_id: 1, value: "Most Recent"},
    {filter_id: 2, value: "Oldest"},
    {filter_id: 3, value: "Wins"},
    {filter_id: 4, value: "Losses"},
    {filter_id: 5, value: "Ties"}
]

it('New Team Page', () => {
    mount(
        <ChakraProvider>
            <TeamRatingsBox
                teamMatches={[]}
                filters={filters}
                tableSize={20}
            />
        </ChakraProvider>
    )
    cy.get('[name="search-bar"]').type('1200')
    cy.get('[name="category-dropdown"]').select(3)
    cy.get('[aria-label="page-left"]').click()
    cy.get('[aria-label="page-right"]').click()
})