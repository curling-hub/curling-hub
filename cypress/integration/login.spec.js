describe('Login page rendering and navigation', () => {
    const port = Cypress.env('PORT') || '3000'
    const baseUrl = `http://localhost:${port}`
    it('should navigate to the signup page', () => {
        cy.visit(`${baseUrl}/login`)
        cy.get('a').contains('Sign Up').click()
        cy.url().should('include', '/signup')
    })
    it('should contain a Login with Email button', () => {
        cy.visit(`${baseUrl}/login`)
        cy.get('button').contains('Login with Email').click()
    })
    it('should contain a Login with Google button', () => {
        cy.visit(`${baseUrl}/login`)
        cy.get('button').contains('Login with Google').click()
    })
    it('should contain a Privacy Policy button', () => {
        cy.visit(`${baseUrl}/login`)
        cy.get('button').contains('Privacy Policy').click()
    })
    it('should contain a Terms of Service button', () => {
        cy.visit(`${baseUrl}/login`)
        cy.get('button').contains('Terms of Service').click()
    })
})
