import * as React from 'react'
import { mount } from '@cypress/react'
import { ChakraProvider } from '@chakra-ui/react'
import Login from '../login.tsx'

it('Login Page', () => {
    mount(
        <ChakraProvider>
            <Login/>
        </ChakraProvider>
    )
    cy.get('button').contains('Login with email').click()
    cy.get('button').contains('Login with Google').click()
    cy.get('button').contains('Terms of service').click()
    cy.get('button').contains('Privacy Policy').click()
})

