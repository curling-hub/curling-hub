describe('New Team Tests', () => {
const port = Cypress.env("PORT") || '3000'
const baseUrl = `http://localhost:${port}/new-team`
it('Team Name and Required Should Appear', () => {
    cy.visit(`${baseUrl}`)
    cy.contains('Team Name')
    cy.contains('Team Name is required')
})

it('Curler One and Required Should Appear', () => {
    cy.visit(`${baseUrl}`)
    cy.contains('Curler One')
    cy.contains('Curler One is required')
})

it('Curler Two and Required Should Appear', () => {
    cy.visit(`${baseUrl}`)
    cy.contains('Curler Two')
    cy.contains('Curler Two is required')
})

it('Curler Three and Required Should Appear', () => {
    cy.visit(`${baseUrl}`)
    cy.contains('Curler Three')
    cy.contains('Curler Three is required')
})

it('Curler Four and Required Should Appear', () => {
    cy.visit(`${baseUrl}`)
    cy.contains('Curler Four')
    cy.contains('Curler Four is required')
})

it('Create Account Button Should Appear', () => {
    cy.visit(`${baseUrl}`)
    cy.get('button').contains('Create Account').click()
  //  cy.url().should('include', '/')
})

it('Singles/Doubles Radio Should Appear', () => {
    cy.visit(`${baseUrl}`)
    cy.get('[type="radio"]').first().check()//Correct? Not sure.
//    cy.get('[type="radio"]')
})


})