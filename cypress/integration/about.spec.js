describe('About page rendering', () => {
    const port = Cypress.env('PORT') || '3000'
    const baseUrl = `http://localhost:${port}`
    it('should contain about', () => {
        cy.visit(`${baseUrl}/about`)
        cy.get('h1').contains('Who we are')
    })
})