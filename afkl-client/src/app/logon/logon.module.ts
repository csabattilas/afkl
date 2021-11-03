import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {LogonComponent} from './logon.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    LogonComponent
  ],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    SharedModule,
  ]
})
export class LogonModule {
}
