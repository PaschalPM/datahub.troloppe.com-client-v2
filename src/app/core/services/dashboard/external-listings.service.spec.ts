import { TestBed } from '@angular/core/testing';

import { ExternalListingsServiceTsService } from './external-listings.service';

describe('ExternalListingsServiceTsService', () => {
  let service: ExternalListingsServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExternalListingsServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
