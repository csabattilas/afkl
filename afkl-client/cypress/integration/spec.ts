describe('All test', () => {
  before(() => {
    cy.visit('/');
  })

  it('should open logon as default path', () => {
    cy.visit('/')
    cy.contains('Retrieve your booking')
    cy.contains('Retrieve your booking')
  })
})
