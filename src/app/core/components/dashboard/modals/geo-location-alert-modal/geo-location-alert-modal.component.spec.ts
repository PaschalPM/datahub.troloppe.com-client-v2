import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoLocationAlertModalComponent } from './geo-location-alert-modal.component';

describe('GeoLocationAlertModalComponent', () => {
  let component: GeoLocationAlertModalComponent;
  let fixture: ComponentFixture<GeoLocationAlertModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeoLocationAlertModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeoLocationAlertModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
