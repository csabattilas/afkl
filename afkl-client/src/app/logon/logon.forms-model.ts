import {FormControl, FormGroup} from '@angular/forms';
import {QueryBookingExistArgs} from '../types';

type LogonFormControl = FormControl & {
  value: string;
}

export interface LogonFormControls {
  bookingCode: LogonFormControl;
  lastName: LogonFormControl;
}

export type LogonFormGroup = FormGroup & {
  value: QueryBookingExistArgs,
  controls: LogonFormControls,
}
