import {NgModule} from '@angular/core';
import {BookingComponent} from './booking.component';
import {ConnectionComponent} from './components/connection/connection.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    BookingComponent,
    ConnectionComponent,
  ],
  imports: [
    MatExpansionModule,
    MatIconModule,
    SharedModule,
  ]
})
export class BookingModule {
}
