import * as React from 'react'
import { mount } from '@cypress/react'
import { ChakraProvider } from '@chakra-ui/react'
import TermsOfServiceModal from '../TermsOfServiceModal'

it('Terms Of Service', () => {
    mount(
        <ChakraProvider>
            <TermsOfServiceModal isOpen={true} />
        </ChakraProvider>
    )
    cy.contains('Terms of Service')
})