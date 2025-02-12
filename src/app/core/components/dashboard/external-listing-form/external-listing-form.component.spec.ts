import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalListingFormComponent } from './external-listing-form.component';

describe('ExternalListingFormComponent', () => {
  let component: ExternalListingFormComponent;
  let fixture: ComponentFixture<ExternalListingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExternalListingFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExternalListingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
