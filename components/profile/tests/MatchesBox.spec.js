import * as React from 'react'
import { mount } from '@cypress/react'
import { ChakraProvider } from '@chakra-ui/react'
import MatchesBox from '../MatchesBox'

it('Team Profile Page', () => {
    mount(
        <ChakraProvider>
            <MatchesBox color='primary.green'></MatchesBox>
        </ChakraProvider>
    )
    cy.get('button').contains('View Matches').click()
})