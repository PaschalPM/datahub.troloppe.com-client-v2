import { TestBed } from '@angular/core/testing';

import { StreetDataSearchService } from './street-data-search.service';

describe('StreetDataSearchService', () => {
  let service: StreetDataSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StreetDataSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
