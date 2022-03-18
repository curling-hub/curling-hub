import * as React from 'react'
import { mount } from '@cypress/react'
import { ChakraProvider } from '@chakra-ui/react'
import NewHost from '../new-host'

it('New Host Page', () => {
    mount(
        <ChakraProvider>
            <NewHost/>
        </ChakraProvider>
    )
    cy.get('button').contains('Request Account').click()
    cy.get('button').contains('Terms of Service').click()
    cy.get('button').contains('Privacy Policy').click()
})