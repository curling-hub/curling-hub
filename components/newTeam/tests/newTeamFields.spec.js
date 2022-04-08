import * as React from 'react'
import { mount } from '@cypress/react'
import { ChakraProvider } from '@chakra-ui/react'
import NewTeamFields from '../newTeamFields.tsx'

const onOpenPrivacyPolicy = () => {}
const onOpenTermsOfService = () => {}
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
            <NewTeamFields
                onOpenPrivacyPolicy={onOpenPrivacyPolicy}
                onOpenTermsOfService={onOpenTermsOfService}
                categories={categories}
            />
        </ChakraProvider>
    )
    cy.get('input[type="checkbox"]').check({force: true})
    cy.get('input[type="radio"]').check("doubles", {force: true})
    cy.get('input[type="radio"]').check("classic", {force: true})
    cy.get('button').contains('Create Account').click()
    cy.get('button').contains('Terms of Service').click()
    cy.get('button').contains('Privacy Policy').click()
    cy.get('[name="team"]').type('Fish')
    cy.get('[name="curler1"]').type('one')
    cy.get('[name="curler2"]').type('two')
    cy.get('[name="curler3"]').type('three')
    cy.get('[name="curler4"]').type('four')
    cy.get('[name="showAlternate"]').click()
    cy.get('[name="alternate"]').type("alt")
    cy.get('[name="showAlternate"]').click()
})