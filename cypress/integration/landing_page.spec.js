
describe('Landing Page Tests', () => {
    const port = Cypress.env("PORT") || '3000'
    const baseUrl = `http://localhost:${port}`
    it('Get Started Module Should Appear', () => {
        cy.visit(`${baseUrl}`)
        cy.contains('Get Started')
    })
    it('Ratings Module Should Appear', () => {
        cy.visit(`${baseUrl}`)
        cy.contains('Ratings')
    })
    it('Sign Up Button Should Navigate to Sign Up Page', () => {
        cy.visit(`${baseUrl}`)
        cy.get('button').contains('Sign Up').click()
        cy.url().should('include', '/signup')
    })
    it('More Info Button Should Navigate to More Info Page', () => {
        cy.visit(`${baseUrl}`)
        cy.get('button').contains('More Info').click()
        cy.url().should('include', '/about')
    })
    it('Ratings button should navigate to the ratings page', () => {
        cy.visit(`${baseUrl}`)
        cy.get('button').contains('Ratings').click()
        cy.url().should('include', '/ratings')
    })
})