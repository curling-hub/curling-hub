import * as React from 'react'
import { mount } from '@cypress/react'
import { ChakraProvider } from '@chakra-ui/react'
import NewHostFields from '../newHostFields.tsx'

it('New Host Page', () => {
    let submissionReceived = false
    mount(
        <ChakraProvider>
            <NewHostFields
                onSubmit={async (values) => {
                    submissionReceived = true
                    expect(values).toEqual(expect.objectContaining({
                        iceSheets: ['A', 'B', 'C', 'D', 'E'],
                    }))
                }}
            />
        </ChakraProvider>
    )
    cy.get('button').contains('Terms of Service').click()
    cy.get('button').contains('Privacy Policy').click()
    cy.get('#organization').type('Husky')
    cy.get('#website').type('https://example.com')
    cy.get('#countryCode').select('+1')
    cy.get('#phone').type('(503) 555-5555')
    cy.get('#address').type('55th Ave')
    cy.get('#city').type('New York City')
    cy.get('#state').select('New York')
    cy.get('#zip').type('55555')
    cy.get('#country').select('USA')
    cy.get('#iceSheetCount').type('5{enter}')
    cy.get('#namingScheme').contains('ABC').click()
    cy.get('input[type="checkbox"]').check({ force: true })
    cy.get('button').contains('Request Account').click().then(() => {
        expect(submissionReceived).to.be.true
    })
})
