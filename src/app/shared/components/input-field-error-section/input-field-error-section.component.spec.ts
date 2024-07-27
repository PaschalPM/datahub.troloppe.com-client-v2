import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFieldErrorSectionComponent } from './input-field-error-section.component';

describe('InputFieldErrorSectionComponent', () => {
  let component: InputFieldErrorSectionComponent;
  let fixture: ComponentFixture<InputFieldErrorSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputFieldErrorSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputFieldErrorSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
