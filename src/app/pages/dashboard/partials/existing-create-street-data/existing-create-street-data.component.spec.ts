import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingCreateStreetDataComponent } from './existing-create-street-data.component';

describe('ExistingCreateStreetDataComponent', () => {
  let component: ExistingCreateStreetDataComponent;
  let fixture: ComponentFixture<ExistingCreateStreetDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExistingCreateStreetDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExistingCreateStreetDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
