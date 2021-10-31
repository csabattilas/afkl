import {TestBed} from '@angular/core/testing';

import {BookingGuardService} from './booking-guard.service';
import {Router} from '@angular/router';

describe('BookingGuardService', () => {
  let service: BookingGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: {}
        },
      ]
    });

    service = TestBed.inject(BookingGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
