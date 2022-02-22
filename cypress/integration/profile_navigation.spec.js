
describe('Profile Page Navigation', () => {
    const port = process.env["PORT"] || '3000'
    const baseUrl = `http://localhost:${port}`
    it('should navigate to the create team page', () => {
        cy.visit(`${baseUrl}/profile`)
        cy.get('button').contains('Create Team').click()
        cy.url().should('include', '/teams/create')
    })
    it('should navigate to the join team page', () => {
        cy.visit(`${baseUrl}/profile`)
        cy.get('button').contains('Join Team').click()
        cy.url().should('include', '/teams/join')
    })
    it('should navigate to the view team page', () => {
        cy.visit(`${baseUrl}/profile`)
        cy.get('button').contains('View Team').click()
        cy.url().should('include', '/teams/view')
    })
    it('should navigate to the matches page', () => {
        cy.visit(`${baseUrl}/profile`)
        cy.get('button').contains('Matches').click()
        cy.url().should('include', '/matches')
    })
    it('should navigate to the ratings page', () => {
        cy.visit(`${baseUrl}/profile`)
        cy.get('button').contains('Ratings').click()
        cy.url().should('include', '/ratings')
    })
})