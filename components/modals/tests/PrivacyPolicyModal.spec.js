import * as React from 'react'
import { mount } from '@cypress/react'
import { ChakraProvider } from '@chakra-ui/react'
import PrivacyPolicyModal from '../PrivacyPolicyModal'

it('Privacy Policy', () => {
    mount(
        <ChakraProvider>
            <PrivacyPolicyModal isOpen={true} />
        </ChakraProvider>
    )
    cy.contains('Privacy Policy')
})