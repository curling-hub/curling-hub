describe('Login page rendering and navigation', () => {
    const port = Cypress.env('PORT') || '3000'
    const baseUrl = `http://localhost:${port}`
    /* 
    it('should navigate to the landing page', () => {
        cy.visit(`${baseUrl}/team-profile`)
        cy.get('a').contains('Logout').click()
        cy.url().should('eq', `${baseUrl}`)
    }) */
    it('should contain an Edit button', () => {
        cy.visit(`${baseUrl}/team-profile`)
        cy.get('button').contains('Edit').click()
    })
    it('should navigate to the matches page', () => {
        cy.visit(`${baseUrl}/team-profile`)
        cy.get('a').contains('View Matches').click()
        cy.url().should('include', '/matches')
    })
})