describe('Login Page', () => {
    it('should navigate to the signup page', () => {
        cy.get('button').contains('Sign Up').click()
        cy.url().should('include', '/signup')
    })
})