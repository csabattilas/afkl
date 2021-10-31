import {Component, ChangeDetectionStrategy} from '@angular/core';
import {BookingService} from './booking.service';
import {Observable} from 'rxjs';
import {Booking} from '../types';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingComponent {
  error$ = this.bookingService.error$;

  booking$: Observable<Booking> = this.bookingService
    .getBookingDetails(
      this.activatedRoute.snapshot.queryParams.bookingCode,
      this.activatedRoute.snapshot.queryParams.lastName,
    )

  constructor(
    private readonly bookingService: BookingService,
    private readonly activatedRoute: ActivatedRoute
  ) {
  }
}
