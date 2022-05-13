import * as React from 'react'
import { mount } from '@cypress/react'
import { ChakraProvider } from '@chakra-ui/react'
import NewTeamFields from '../newTeamFields.tsx'

const onOpenPrivacyPolicy = () => {}
const onOpenTermsOfService = () => {}
const categories = [
    {categoryId: 1, name: "Open"},
    {categoryId: 2, name: "Mixed"},
    {categoryId: 3, name: "Women"},
    {categoryId: 4, name: "Men"},
    {categoryId: 5, name: "U18"},
    {categoryId: 6, name: "U5"},
    {categoryId: 7, name: "Junior"},
    {categoryId: 8, name: "Senior"},
    {categoryId: 9, name: "Doubles"},
]

it('New Team Page', () => {
    let clicked = false
    mount(
        <ChakraProvider>
            <NewTeamFields
                onOpenPrivacyPolicy={onOpenPrivacyPolicy}
                onOpenTermsOfService={onOpenTermsOfService}
                categories={categories}
                onSubmit={(values) => {
                    clicked = true
                    expect(values).toEqual(
                        expect.objectContaining({
                            curler1: 'one',
                            curler2: 'two',
                            curler3: 'three',
                            curler4: 'four',
                            //agreed: true,
                        })
                    )
                }}
            />
        </ChakraProvider>
    )
    cy.get('input[type="checkbox"]').check({force: true})
    cy.get('input[type="radio"]').check("doubles", {force: true})
    cy.get('input[type="radio"]').check("open", {force: true})
    cy.get('button').contains('Terms of Service').click()
    cy.get('button').contains('Privacy Policy').click()
    // showAlternate might take a while to respond- lift it up from .get('[name="alternate"]')
    cy.get('[name="showAlternate"]').click()
    cy.get('[name="team"]').type('Fish')
    cy.get('[name="curler1"]').type('one')
    cy.get('[name="curler2"]').type('two')
    cy.get('[name="curler3"]').type('three')
    cy.get('[name="curler4"]').type('four')
    cy.get('#categories').type(`${categories[0].name}\{enter\}${categories[1].name}\{enter\}`)
    cy.get('[name="alternate"]').type("alt")
    cy.get('[name="showAlternate"]').click()
    cy.get('button').contains('Create Account').click().then(() => {
        expect(clicked).to.be.true
    })
})