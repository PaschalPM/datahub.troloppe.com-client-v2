import { TestBed } from '@angular/core/testing';

import { ListingsAgentsService } from './listings-agents.service';

describe('ListingsAgentsService', () => {
  let service: ListingsAgentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListingsAgentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
