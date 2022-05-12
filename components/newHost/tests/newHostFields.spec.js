import * as React from 'react'
import { mount } from '@cypress/react'
import { ChakraProvider } from '@chakra-ui/react'
import NewHostFields from '../newHostFields.tsx'

it('New Host Page', () => {
    let clicked = false
    mount(
        <ChakraProvider>
            <NewHostFields
                onSubmit={async () => { clicked = true }}
            />
        </ChakraProvider>
    )
    cy.get('button').contains('Terms of Service').click()
    cy.get('button').contains('Privacy Policy').click()
    cy.get('#organization').type('Husky')
    cy.get('#website').type('https://example.com')
    cy.get('#countryCode').select('+1')
    cy.get('#phone').type('(555) 555-5555')
    cy.get('#address').type('55th Ave')
    cy.get('#city').type('New York City')
    cy.get('#state').select('New York')
    cy.get('#zip').type('55555')
    cy.get('#country').select('USA')
    cy.get('#iceSheets').type('5{enter}')
    cy.get('input[type="checkbox"]').check({force: true})
    cy.get('button').contains('Request Account').click().then(() => {
        expect(clicked).to.be.true
    })
})
