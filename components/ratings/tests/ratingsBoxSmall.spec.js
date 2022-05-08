import * as React from 'react'
import { mount } from '@cypress/react'
import { ChakraProvider } from '@chakra-ui/react'
import RatingsBoxSmall from '../ratingsBoxSmall'

const categories = [
    {category_id: 1, value: "Open"},
    {category_id: 2, value: "Mixed"},
    {category_id: 3, value: "Women"},
    {category_id: 4, value: "Men"},
    {category_id: 5, value: "U18"},
    {category_id: 6, value: "U5"},
    {category_id: 7, value: "Junior"},
    {category_id: 8, value: "Senior"},
]

it('New Team Page', () => {
    mount(
        <ChakraProvider>
            <RatingsBoxSmall
                categories={categories}
                teamRanking={[]}
                tableSize={20}
            />
        </ChakraProvider>
    )
    cy.get('[name="search-bar"]').type('1200')
    cy.get('[name="category-dropdown"]').select(3)
})