import * as React from 'react'
import { mount } from '@cypress/react'
import { ChakraProvider } from '@chakra-ui/react'
import ProfileButton from '../ProfileButton'
import themes from '../../../themes/colors'

it('Team Profile Page', () => {
    mount(
        <ChakraProvider>
            <ProfileButton color='primary.green' buttonText='Profile Button' />
        </ChakraProvider>
    )
    cy.get('button').contains('Profile Button').click()
})