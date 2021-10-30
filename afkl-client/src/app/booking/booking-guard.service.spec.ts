import { TestBed } from '@angular/core/testing';

import { BookingGuardService } from './booking-guard.service';

describe('BookingGuardService', () => {
  let service: BookingGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
