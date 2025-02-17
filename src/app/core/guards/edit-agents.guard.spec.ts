import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { editAgentsGuard } from './edit-agents.guard';

describe('editAgentsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => editAgentsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
