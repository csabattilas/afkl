import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AppRoutingModule} from '../app-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    MatProgressSpinnerModule,
    MatFormFieldModule,
    CommonModule,
    AppRoutingModule,
  ]
})
export class SharedModule {
}
