describe('Visit paths and see correct components', () => {
	it('Access to root page and see correct labels', () => {
		cy.visit('http://localhost:3000');
		cy.contains('Iniciar Sesión');
		cy.contains('Registrarme');
	});
	it('Can visith auth/login page and switch to auth/register page', () => {
		cy.visit('http://localhost:3000/auth/login');
		cy.contains('Aun no tienes una cuenta').click();
		cy.url().should('include', 'register');
	});
});
