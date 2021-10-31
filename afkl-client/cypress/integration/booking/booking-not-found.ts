describe('Retrieve booking with not found booking', () => {
  const apiUrl = Cypress.env('API_URL');

  before(() => {
  })

  it('should navigate back to logon when no booking info is in the url', () => {
    const url = `${apiUrl}/graphql`

    cy.visit('/booking')
    cy.url().should('include', 'logon');

  });

  it('should navigate back to logon when no booking was found', () => {
    const url = `${apiUrl}/graphql`

    cy.intercept({
        url
      },
      (req) => {
        req.on('response', (res) => {
          res.setThrottle(1)
        })
      }).as('graphql');

    cy.visit('/booking?lastName=SZABO&bookingCode=BLA123');

    cy.wait('@graphql').then(() => {
      cy.url().should('include', 'logon');
      cy.contains('Could not');
    })
  });
})
