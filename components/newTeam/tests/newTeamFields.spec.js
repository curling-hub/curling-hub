import * as React from 'react'
import { mount } from '@cypress/react'
import { ChakraProvider } from '@chakra-ui/react'
import NewTeamFields from '../newTeamFields.tsx'

it('New Team Page', () => {
    mount(
        <ChakraProvider>
            <NewTeamFields/>
        </ChakraProvider>
    )
    cy.get('button').contains('Create Account').click()
    cy.get('button').contains('Terms of Service').click()
    cy.get('button').contains('Privacy Policy').click()
})