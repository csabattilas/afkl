import {e2e} from '../../support/helper';
import {BookingFixturesType, BookingFixtures} from '../../support/commands/booking/booking.model';

describe('Retrieve booking with booking', () => {
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

  it('should navigate to booking when valid booking is found', () => {
    const url = `${apiUrl}/graphql`

    const fixture = bookingFixtures[BookingFixturesType.VAlID]

    cy.fillInLogonForm(fixture);

    cy.intercept({
        url,
        times: 2
      },
      (req) => {
        req.on('response', (res) => {
          res.setThrottle(1)
        })
      }).as('graphql');

    cy.get(e2e('button_logon')).click();

    cy.get(e2e('spinner_loading')).should('exist');

    cy.wait('@graphql').then(() => {
      cy.url().should('include', `bookingCode=${fixture.bookingCode}`);
      cy.url().should('include', `lastName=${fixture.lastName}`);

      cy.get(e2e('spinner_loading')).should('exist');
    })

    cy.wait('@graphql').then(() => {
      cy.contains('Your one way booking to ');
    })
  });
})
