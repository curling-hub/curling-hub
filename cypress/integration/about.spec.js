describe('About page rendering'), () => {
    const port = Cypress.env('PORT') || '3000'
    const baseUrl = `http://localhost:${port}`
    it('should contain about'), () => {
        cy.visit(`${baseUrl}/about`)
        cy.get('p').contains('Curlo is a not for profit website')
    }
}