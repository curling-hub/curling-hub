describe('New Team Page Navigation', () => {
    const port = Cypress.env("PORT") || '3000'
    const baseUrl = `http://localhost:${port}`
    it('should navigate to the my team page', () => {
        cy.visit(`${baseUrl}/team-profile`)
        cy.get('button').contains('Create Team').click()
        cy.url().should('include', '/team-profile')
    })
})