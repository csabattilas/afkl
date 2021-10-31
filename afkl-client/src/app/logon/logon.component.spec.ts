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
          useValue: {}
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
});
