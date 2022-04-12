import * as React from 'react'
import { mount } from '@cypress/react'
import { ChakraProvider } from '@chakra-ui/react'
import ProfileButton from '../ProfileButton'
import themes from '../../../themes/colors'

it('Team Profile Page', () => {
    mount(
        <ChakraProvider>
            <ProfileButton color='primary.green'>
                Profile Button
            </ProfileButton>
        </ChakraProvider>
    )
    cy.get('button').contains('View Matches').click()
})