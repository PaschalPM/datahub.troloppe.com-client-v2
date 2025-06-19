import { TestBed } from '@angular/core/testing';

import { DummyInvestmentDataService } from './dummy-investment-data.service';

describe('Export DummyInvestmentDataService', () => {
  let service:  DummyInvestmentDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject( DummyInvestmentDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
