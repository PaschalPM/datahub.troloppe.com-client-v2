import { TestBed } from '@angular/core/testing';

import { PaginatedSelectFieldService } from './paginated-select-field.service';

describe('PaginatedSelectFieldService', () => {
  let service: PaginatedSelectFieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginatedSelectFieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
