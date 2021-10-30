import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {BookingService} from './booking.service';
import {Observable, throwError} from 'rxjs';
import {Booking} from '../types';
import {ActivatedRoute} from '@angular/router';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingComponent implements OnInit {
  error?: string;
  booking$: Observable<Booking> = this.bookingService
    .getBookingDetails(
      this.activatedRoute.snapshot.queryParams.bookingCode,
      this.activatedRoute.snapshot.queryParams.lastName,
    ).pipe(catchError((e) => {
      this.error = 'Could not retrieve booking';
      return throwError(e);
    }))

  constructor(
    private readonly bookingService: BookingService,
    private readonly activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
  }
}
