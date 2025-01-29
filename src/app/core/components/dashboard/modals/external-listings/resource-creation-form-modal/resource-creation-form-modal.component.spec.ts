import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceCreationFormModalComponent } from './resource-creation-form-modal.component';

describe('ResourceCreationFormModalComponent', () => {
  let component: ResourceCreationFormModalComponent;
  let fixture: ComponentFixture<ResourceCreationFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceCreationFormModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResourceCreationFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
