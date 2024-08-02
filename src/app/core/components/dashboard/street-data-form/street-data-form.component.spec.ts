import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreetDataFormComponent } from './street-data-form.component';

describe('StreetDataFormComponent', () => {
  let component: StreetDataFormComponent;
  let fixture: ComponentFixture<StreetDataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StreetDataFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StreetDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
