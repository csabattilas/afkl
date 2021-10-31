import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {BookingService} from './booking.service';

@Injectable({
  providedIn: 'root'
})
export class BookingGuardService {
  constructor(
    private readonly bookingService: BookingService,
    private readonly router: Router,
  ) {
  }

  canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (activatedRouteSnapshot.queryParams.bookingCode && activatedRouteSnapshot.queryParams.lastName) {
      return this.bookingService.checkBooking(activatedRouteSnapshot.queryParams.bookingCode, activatedRouteSnapshot.queryParams.lastName)
        .pipe(
          catchError((e) => {
            this.router.navigate(['logon'])
            return throwError(false);
          }))
    } else {
      this.router.navigate(['logon']);
      return false;
    }
  }
}
