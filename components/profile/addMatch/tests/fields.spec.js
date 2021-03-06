import * as React from 'react'
import { mount } from '@cypress/react'
import { ChakraProvider } from '@chakra-ui/react'
import AddMatchFields from '../fields'


const currentTeam = {
    teamId: 0, name: 'My Team', rating: '900'
}

const teams = [
    { teamId: 1, name: 'Team A', rating: '700' },
    { teamId: 2, name: 'Team B', rating: '660' },
]

const hosts = [
    { hostId: 1, organization: 'Curly Inc', website: null },
]

const fetchIceSheets = async (_hostId) => {
    return [ 'Left', 'Right', 'Middle' ]
}


it('Renders add match fields that are selectable', () => {
    let clicked = false
    mount(
        <ChakraProvider>
            <AddMatchFields
                currentTeam={currentTeam}
                hosts={hosts}
                teams={teams}
                onSubmit={(values) => {
                    clicked = true
                    expect(values).toEqual(expect.objectContaining({
                        team1: '0',
                        team2: '1',
                        matchResult: 'Win',
                        date: '2022-04-07',
                        location: '1',
                        sheetOfIce: 'Right',
                        comments: 'Coming from cypress test',
                    }))
                }}
                fetchIceSheetsByHostId={fetchIceSheets}
            />
        </ChakraProvider>
    )
    cy.contains('Add Match')
    cy.contains('Win')
    cy.contains('Loss')
    cy.contains('Tie')
    cy.get('#location').type('Curly Inc{enter}')
    cy.get('#date').type('2022-04-07')
    cy.get('#team2').type('Team A{enter}')
    cy.get('#sheet-of-ice').type('Right{enter}')
    cy.get('#comment').type('Coming from cypress test')
    cy.get('button').contains('Add Match').click().then(() => {
        expect(clicked).to.be.true
    })
})
