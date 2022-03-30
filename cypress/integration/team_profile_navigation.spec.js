describe('Team Profile Page Navigation', () => {
    const port = Cypress.env("PORT") || '3000'
    const baseUrl = `http://localhost:${port}`
    it('should navigate to the my team page', () => {
        cy.visit(`${baseUrl}/team-profile`)
        cy.get('button').contains('My Team').click()
        cy.url().should('include', '/team-profile')
    })
    it('should navigate to the add match page', () => {
        cy.visit(`${baseUrl}/team-profile`)
        cy.get('button').contains('Add Team').click()
        cy.url().should('include', '/team-add-match')
    })
    it('should navigate to the matches page', () => {
        cy.visit(`${baseUrl}/team-profile`)
        cy.get('button').contains('Matches').click()
        cy.url().should('include', '/matches')
    })
    it('should navigate to the ratings page', () => {
        cy.visit(`${baseUrl}/team-profile`)
        cy.get('button').contains('Ratings').click()
        cy.url().should('include', '/ratings')
    })
})