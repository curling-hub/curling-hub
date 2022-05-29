import * as React from 'react'
import { mount } from '@cypress/react'
import { ChakraProvider } from '@chakra-ui/react'
import CurloButton from '../../buttons/CurloButton'

it('Team Profile Profile Button', () => {
    mount(
        <ChakraProvider>
            <CurloButton color='primary.green' buttonText='Profile Button' />
        </ChakraProvider>
    )
    cy.get('button').contains('Profile Button').click()
})