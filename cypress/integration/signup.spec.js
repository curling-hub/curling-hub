describe('Sign up page rendering and navigation', () => {
    const port = Cypress.env('PORT') || '3000'
    const baseUrl = `http://localhost:${port}`
    it('should navigate to the login page', () => {
        cy.visit(`${baseUrl}/signup`)
        cy.get('a').contains('Login').click()
        cy.url().should('include', '/login')
    })
})
