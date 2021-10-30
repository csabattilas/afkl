import {Injectable} from '@angular/core';
import gql from "graphql-tag";
import {Observable, Subject, throwError} from 'rxjs';
import {Booking, Query} from '../types';
import {Apollo} from 'apollo-angular';
import {map, catchError} from 'rxjs/operators';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

const nodeFragment = gql`
  fragment node on Node {
    airport
    city
    iata
    country
  }`

const flightFragment = gql`
  fragment flight on Flight {
    number
    carrier
    checkInStartTime
    scheduledDepartureTime
    scheduledArrivalTime
    cabin
    aircraft
  }`

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private loading = new Subject<boolean>();
  loading$ = this.loading.asObservable();

  private error = new Subject<string>();
  error$ = this.error.asObservable();

  constructor(private readonly apollo: Apollo) {
  }

  checkBooking(bookingCode: string, lastName: string): Observable<boolean> {
    this.loading.next(true);
    this.error.next('');

    return this.apollo.query<Query>({
      query: gql`
        query bookingExist($bookingCode: String!, $lastName: String!) {
          bookingExist(bookingCode: $bookingCode, lastName: $lastName)
        }`,
      variables: {
        bookingCode,
        lastName
      },
      fetchPolicy: "network-only"
    }).pipe(
      catchError((e) => {
        this.loading.next(false);
        this.error.next('Could not retrieve this booking!')

        return throwError(e);
      }),
      map(({data}) => data.bookingExist),
      untilDestroyed(this)
    );
  }

  getBookingDetails(bookingCode: string, lastName: string): Observable<Booking> {
    this.error.next('');

    return this.apollo.query<Query>({
      query: gql`
        ${nodeFragment}
        ${flightFragment}
        query getBookingDetails($bookingCode: String!, $lastName: String!) {
          getBookingDetails(bookingCode: $bookingCode, lastName: $lastName) {
            itinerary {
              type
              destinationCity
              connections {
                origin {
                  ...node
                },
                destination {
                  ...node
                }
                duration,
                segments {
                  arriveOn {
                    ...node
                  }
                  departFrom {
                    ...node
                  }
                  flight {
                    ...flight
                  }
                }
              }
            },
            passengers {
              lastName
              firstName
              title
            }
          }
        }
      `,
      variables: {
        bookingCode,
        lastName
      },
      fetchPolicy: "network-only"
    }).pipe(
      map(({data}) => data.getBookingDetails),
      untilDestroyed(this)
    );
  }
}