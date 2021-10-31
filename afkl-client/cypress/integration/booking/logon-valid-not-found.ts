import {e2e} from '../../support/helper';
import {BookingFixturesType, BookingFixtures} from '../../support/commands/booking/booking.model';

describe('Retrieve booking with not found booking', () => {
  let bookingFixtures: BookingFixtures;
  const apiUrl = Cypress.env('API_URL');

  before(() => {
    cy.fixture('booking/booking-fixtures').then((data) => {
      bookingFixtures = data;
    })
  })

  beforeEach(() => {
    cy.visit('/')
  })

  it('should show error when no booking was found', () => {
    const url = `${apiUrl}/graphql`

    cy.fillInLogonForm(bookingFixtures[BookingFixturesType.INVALID_BOOKING_NOT_FOUND])

    cy.intercept({
        url
      },
      (req) => {
        req.on('response', (res) => {
          res.setThrottle(1)
        })
      }).as('graphql');

    cy.get(e2e('button_logon')).click();

    cy.get(e2e('spinner_loading')).should('exist');

    cy.wait('@graphql').then(() => {
      cy.get(e2e('error-msg_page')).should('exist');
    })
  });
})
