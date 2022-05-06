describe('Admin Requests Page Tests', () => {
    const port = Cypress.env("PORT") || '3000'
    const baseUrl = `http://localhost:${port}`
    it('Should contain a Pending tab', () => {
        cy.visit(`${baseUrl}/admin-requests`)
        cy.get('[name="pending-tab"]').click({force: true})
    })
    it('Should contain an Accepted tab', () => {
        cy.visit(`${baseUrl}/admin-requests`)
        cy.get('[name="accepted-tab"]').click({force: true})
    })
    it('Should contain a Rejected tab', () => {
        cy.visit(`${baseUrl}/admin-requests`)
        cy.get('[name="rejected-tab"]').click({force: true})
    })
})