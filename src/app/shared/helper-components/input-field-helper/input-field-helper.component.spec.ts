import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFieldHelperComponent } from './input-field-helper.component';

describe('InputFieldHelperComponent', () => {
  let component: InputFieldHelperComponent;
  let fixture: ComponentFixture<InputFieldHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputFieldHelperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputFieldHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
