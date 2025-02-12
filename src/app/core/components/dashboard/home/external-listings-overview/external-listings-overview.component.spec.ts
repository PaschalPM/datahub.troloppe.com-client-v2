import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalListingsOverviewComponent } from './external-listings-overview.component';

describe('ExternalListingsOverviewComponent', () => {
  let component: ExternalListingsOverviewComponent;
  let fixture: ComponentFixture<ExternalListingsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExternalListingsOverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExternalListingsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
