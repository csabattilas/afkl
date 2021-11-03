import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LogonComponent} from './logon/logon.component';
import {BookingComponent} from './booking/booking.component';
import {BookingGuardService} from './shared/services/booking-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'logon',
    pathMatch: 'full'
  },
  {
    path: 'logon',
    component: LogonComponent,
  },
  {
    path: 'booking',
    component: BookingComponent,
    canActivate: [BookingGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
