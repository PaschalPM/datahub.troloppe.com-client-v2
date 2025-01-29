import { TestBed } from '@angular/core/testing';

import { ResourceCreationFormModalService } from './resource-creation-form-modal.service';

describe('ResourceCreationFormModalService', () => {
  let service: ResourceCreationFormModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourceCreationFormModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
