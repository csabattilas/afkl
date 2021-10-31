export interface BookingFixture {
  bookingCode: string;
  lastName: string;
}

export enum BookingFixturesType {
  VAlID = 'valid',
  INVALID_BOOKING_NOT_FOUND = "bookingNotFound",
  INVALID_SHORT_BOOKING = "invalidShortBookingCode",
  INVALID_NO_LASTNAME = "invalidNoLastName",
  INVALID_NO_BOOKING_CODE = "invalidNoBookingCode",
}

export type BookingFixtures = Record<BookingFixturesType, BookingFixture>;
