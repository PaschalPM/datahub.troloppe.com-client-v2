import { TestBed } from '@angular/core/testing';

import { SelectDropdownService } from './select-dropdown.service';

describe('SelectDropdownService', () => {
  let service: SelectDropdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectDropdownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
