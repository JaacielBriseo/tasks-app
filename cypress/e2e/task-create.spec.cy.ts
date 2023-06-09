describe('Task Creation', () => {
	it('Should access to dashboard and create a task', () => {
		const randomNumber = Math.random();
		cy.visit('http://localhost:3000/auth/login');
		cy.get('input[name="email"]').type('testuno@google.com');
		cy.get('input[name="password"]').type('Abc123456');
		cy.get('button').click({ multiple: true });
		cy.url().should('include', '/dashboard');
		cy.contains('Agregar Tarea').click({ multiple: true });
		cy.contains('Nueva entrada').should('be.visible').type(`Tarea de prueba ${randomNumber}`);
		cy.contains('Guardar').click();

		cy.contains(`Tarea de prueba ${randomNumber}`).should('be.visible');
	});
});
