describe('Home Page Navigation', () => {
    const port = Cypress.env("PORT") || '3000'
    const baseUrl = `http://localhost:${port}`
    it('should contain a login button', () => {
        cy.visit(`${baseUrl}/login`)
        cy.get('button').contains('Login with Email').click()
    })
    it('should contain a login with google button', () => {
        cy.visit(`${baseUrl}/login`)
        cy.get('button').contains('Login with Google').click()
    })
    it('should contain a TOS button', () => {
        cy.visit(`${baseUrl}/login`)
        cy.get('button').contains('Terms of Service').click()
    })
    it('should contain a privacy policy button', () => {
        cy.visit(`${baseUrl}/login`)
        cy.get('button').contains('Privacy Policy').click()
    })
    /* This test won't work until page navigation is implemented.
    it('should navigate to the signup page', () => {
        cy.get('button').contains('Sign Up').click()
        cy.url().should('include', '/signup')
    })
    */
})