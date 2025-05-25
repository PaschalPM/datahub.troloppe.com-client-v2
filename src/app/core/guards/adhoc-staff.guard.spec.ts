import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adhocStaffGuard } from './adhoc-staff.guard';

describe('adhocStaffGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adhocStaffGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
