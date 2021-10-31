describe('Retrieve booking with found booking', () => {
  it('should show booking details', () => {

    cy.visit('/booking?lastName=HESP&bookingCode=PZIGZ3');

    cy.get('[data-e2e^="expansion-panel_connection-"]').should('have.length', 1);
    cy.get('[data-e2e="expansion-panel_connection-0"] mat-expansion-panel-header').click();
    cy.contains('Flight: KL1263');
    cy.contains('Boeing 737-800');
    cy.contains('Mr RUUD HESP')
  });
})
