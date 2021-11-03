import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {BookingService} from '../shared/services/booking.service';
import {Observable} from 'rxjs';
import {Booking} from '../types';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingComponent implements OnInit {
  error$ = this.bookingService.error$;
  booking$?: Observable<Booking>

  constructor(
    private readonly bookingService: BookingService,
    private readonly activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    const bookingCode = this.activatedRoute.snapshot.queryParams.bookingCode;
    const lastName = this.activatedRoute.snapshot.queryParams.lastName;

    this.booking$ = this.bookingService.getBookingDetails(bookingCode, lastName);
  }
}
