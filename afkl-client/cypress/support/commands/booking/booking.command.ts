import {e2e} from '../../helper';
import {BookingFixture} from './booking.model';

export const fillInLogonForm = (fixtureData: BookingFixture) => {
  Object.keys(fixtureData).forEach((key) => {
    const value: string = fixtureData[key as keyof BookingFixture];
    if (value) {
      cy.get(e2e(`input_${key}`)).type(value);
    }
  })
}
