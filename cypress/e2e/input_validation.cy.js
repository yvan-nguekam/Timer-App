describe('Timer App treplace Function', () => {
  beforeEach(() => {
    cy.visit('index.html'); // Adjust the path to your index.html file
  });

  it('should replace invalid inputs in seconds field', () => {
    cy.get('#seconds').clear().type('8c').blur();
    cy.get('#seconds').should('have.value', '8');

    cy.get('#seconds').clear().type('89').blur();
    cy.get('#seconds').should('have.value', '8');
  });

  it('should not alter valid inputs in seconds field', () => {
    cy.get('#seconds').clear().type('10').blur();
    cy.get('#seconds').should('have.value', '10');

    cy.get('#seconds').clear().type('50').blur();
    cy.get('#seconds').should('have.value', '50');
  });
});
