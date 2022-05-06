import * as React from 'react'
import { mount } from '@cypress/react'
import { ChakraProvider } from '@chakra-ui/react'
import AddMatchFields from '../fields'


const teams = [
    { teamId: 1, name: 'Team A', rating: '700' },
    { teamId: 2, name: 'Team B', rating: '660' },
]

const fetchIceSheets = (_hostId) => {
    return [ 'Left', 'Right', 'Middle' ]
}

const host = { hostId: 'host 1', organization: 'Curly Inc', website: null, iceSheets: fetchIceSheets() }


it('Renders add match fields that are selectable', () => {
    let clicked = false
    mount(
        <ChakraProvider>
            <AddMatchFields
                host={host}
                teams={teams}
                onSubmit={(values) => {
                    clicked = true
                    expect(values).toStrictEqual({
                        team1: '0',
                        team2: '1',
                        matchResult: 'Win',
                        date: '2022-04-07',
                        location: 'host 1',
                        sheetOfIce: 'Right',
                        comments: 'Coming from cypress test',
                    })
                }}
            />
        </ChakraProvider>
    )
    cy.contains('Add Match')
    cy.contains('Win')
    cy.contains('Loss')
    cy.contains('Tie')
    cy.get('#date').type('2022-04-07')
    cy.get('#team1').type('Team A{enter}')
    cy.get('#team2').type('Team B{enter}')
    cy.get('#sheet-of-ice').select('Right')
    cy.get('#comment').type('Coming from cypress test')
    cy.get('button').contains('Add Match').click().then(() => {
        expect(clicked).to.be.true
    })
})
