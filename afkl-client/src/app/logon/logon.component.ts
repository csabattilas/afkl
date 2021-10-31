import {Component, ChangeDetectionStrategy} from '@angular/core';
import {FormBuilder, Validators, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {BookingService} from '../booking/booking.service';
import {LogonFormGroup, LogonFormControls} from './logon.forms-model';

@Component({
  selector: 'app-logon',
  templateUrl: './logon.component.html',
  styleUrls: ['./logon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogonComponent {
  form: LogonFormGroup;
  loading$ = this.bookingService.loading$;
  error$ = this.bookingService.error$;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly bookingService: BookingService,
  ) {
    this.form = this.buildForm()
  }

  logon() {
    this.form.markAllAsTouched();

    if (this.form?.valid) {
      this.router.navigate(['booking'], {
        queryParams: {
          bookingCode: this.form?.get('bookingCode')?.value.trim(),
          lastName: this.form?.get('lastName')?.value.trim()
        }
      })
    }
  }

  private buildForm(): LogonFormGroup {
    return this.formBuilder.group({
        bookingCode: new FormControl(
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(6)
          ]),
        lastName: new FormControl(
          '',
          [Validators.required]
        ),
      } as LogonFormControls
    ) as LogonFormGroup;
  }
}
