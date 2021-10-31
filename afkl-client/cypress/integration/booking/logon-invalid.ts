import {BookingFixtures, BookingFixturesType} from '../../support/commands/booking/booking.model';
import {e2e} from '../../support/helper';

describe('Retrieve booking with invalid inputs', () => {
  let bookingFixtures: BookingFixtures;

  before(() => {
    cy.fixture('booking/booking-fixtures').then((data) => {
      bookingFixtures = data;
    })
  })

  beforeEach(() => {
    cy.visit('/')
  })

  it('should show error when no booking code is filled in', () => {
    cy.fillInLogonForm(bookingFixtures[BookingFixturesType.INVALID_NO_BOOKING_CODE])

    cy.get(e2e('button_logon')).click();
    cy.get(e2e('error-msg_booking-required')).should('exist');
  });

  it('should show error when no family name is filled in', () => {
    cy.fillInLogonForm(bookingFixtures[BookingFixturesType.INVALID_NO_LASTNAME])

    cy.get(e2e('button_logon')).click();
    cy.get(e2e('error-msg_lastName-required')).should('exist');
  });

  it('should show error when invalid booking code is filled', () => {
    cy.fillInLogonForm(bookingFixtures[BookingFixturesType.INVALID_SHORT_BOOKING])

    cy.get(e2e('button_logon')).click();
    cy.get(e2e('error-msg_booking-invalid')).should('exist');
  });
})
