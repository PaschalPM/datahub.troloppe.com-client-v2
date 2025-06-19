import { TestBed } from '@angular/core/testing';

import { InvestmentDataService } from './investment-data.service';

describe('InvestmentDataService', () => {
  let service:InvestmentDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
