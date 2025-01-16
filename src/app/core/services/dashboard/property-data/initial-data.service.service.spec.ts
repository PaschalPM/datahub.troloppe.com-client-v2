import { TestBed } from '@angular/core/testing';

import { InitialDataServiceService } from './initial-data.service.service';

describe('InitialDataServiceService', () => {
  let service: InitialDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InitialDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
