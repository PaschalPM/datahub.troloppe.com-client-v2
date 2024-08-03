import { TestBed } from '@angular/core/testing';

import { DebouncedSearchService } from './debounced-search.service';

describe('DebouncedSearchService', () => {
  let service: DebouncedSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DebouncedSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
