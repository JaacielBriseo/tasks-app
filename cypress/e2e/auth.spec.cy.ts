/**
 * Debido a que 8base limita la creación de usuarios
 * a solo 5, no hice el test con el registro
 */
describe('Login and Logout', () => {
	it('Should successfully login and logout', () => {
		cy.visit('http://localhost:3000/auth/login');
		cy.get('input[name="email"]').type('testuno@google.com');
		cy.get('input[name="password"]').type('Abc123456');
		cy.contains('Iniciar Sesión').click({ multiple: true });
		cy.url().should('include', '/dashboard');
		cy.contains('Cerrar Sesión').click({ multiple: true });
		cy.url().should('include', '/auth/login');
	});
	it('Should fail login due to bad credentials', () => {
		cy.visit('http://localhost:3000/auth/login');
		cy.get('input[name="email"]').type('asdfasdfsdfas@google.com');
		cy.get('input[name="password"]').type('asdfasdfasdfasd');
		cy.contains('Iniciar Sesión').click();
		cy.contains('error');
	});
});
