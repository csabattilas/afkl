import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LogonComponent} from './logon.component';
import {ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('LogonComponent', () => {
  let component: LogonComponent;
  let fixture: ComponentFixture<LogonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogonComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: Router,
          useValue: {
            navigate: () => {
            }
          }
        },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate away on valid form', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    component.logon();
    expect(component.form.valid).toBe(false);

    component.form.get('bookingCode')?.setValue('PZIGZ3');
    component.form.get('lastName')?.setValue('');

    component.logon();
    expect(component.form.valid).toBe(false);

    component.form.get('bookingCode')?.setValue('PZIG');
    component.form.get('lastName')?.setValue('HESP');

    component.logon();
    expect(component.form.valid).toBe(false);

    component.form.get('bookingCode')?.setValue('PZIGZ3');
    component.form.get('lastName')?.setValue('HESP');

    component.logon();
    expect(component.form.valid).toBe(true);
    expect(router.navigate).toHaveBeenCalledWith(['booking'], {
      queryParams: {bookingCode: 'PZIGZ3', lastName: 'HESP'}
    });
  })
});
