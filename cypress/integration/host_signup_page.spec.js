describe('Host sign up page rendering and navigation', () => {
    const port = Cypress.env('PORT') || '3000'
    const baseUrl = `http://localhost:${port}`
    /*it('should navigate to the login page', () => {
        cy.visit(`${baseUrl}/new-host`)
        cy.get('a').contains('Login').click()
        cy.url().should('include', '/login')
    })
    
    it('should navigate to the request account page', () => {
        cy.visit(`${baseUrl}/host-signup`)
        cy.get('button').contains('Request Account').click()
        cy.url().should('include', '/requestaccount')
    }) Need a page to direct to when account is requested.*/

    it('should contain a TOS button', () => {
        cy.visit(`${baseUrl}/new-host`)
        cy.get('button').contains('Terms of Service').click()
    })
    it('should contain a privacy policy button', () => {
        cy.visit(`${baseUrl}/new-host`)
        cy.get('button').contains('Privacy Policy').click()
    })
})
