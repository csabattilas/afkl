export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Booking = {
  __typename?: 'Booking';
  itinerary: Itinerary;
  passengers: Array<Passenger>;
};

export type Connection = {
  __typename?: 'Connection';
  destination: Node;
  duration: Scalars['Int'];
  origin: Node;
  segments: Array<Segment>;
};

export type Flight = {
  __typename?: 'Flight';
  aircraft: Scalars['String'];
  cabin: Scalars['String'];
  carrier: Scalars['String'];
  checkInStartTime: Scalars['String'];
  number: Scalars['String'];
  scheduledArrivalTime?: Maybe<Scalars['String']>;
  scheduledDepartureTime: Scalars['String'];
};

export type Itinerary = {
  __typename?: 'Itinerary';
  connections: Array<Connection>;
  destinationCity: Scalars['String'];
  type: Scalars['String'];
};

export type Node = {
  __typename?: 'Node';
  airport: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  iata: Scalars['String'];
};

export type Passenger = {
  __typename?: 'Passenger';
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  bookingExist: Scalars['Boolean'];
  getBookingDetails: Booking;
};


export type QueryBookingExistArgs = {
  bookingCode: Scalars['String'];
  lastName: Scalars['String'];
};


export type QueryGetBookingDetailsArgs = {
  bookingCode: Scalars['String'];
  lastName: Scalars['String'];
};

export type Segment = {
  __typename?: 'Segment';
  arriveOn: Node;
  departFrom: Node;
  flight: Flight;
};
