import { TestBed } from '@angular/core/testing';

import { LoggedInClientServiceService } from './logged-in-client-service.service';

describe('LoggedInClientServiceService', () => {
  let service: LoggedInClientServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggedInClientServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
