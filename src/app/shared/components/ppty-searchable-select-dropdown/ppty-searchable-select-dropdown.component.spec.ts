import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PptySearchableSelectDropdownComponent } from './ppty-searchable-select-dropdown.component';

describe('PptySearchableSelectDropdownComponent', () => {
  let component: PptySearchableSelectDropdownComponent;
  let fixture: ComponentFixture<PptySearchableSelectDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PptySearchableSelectDropdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PptySearchableSelectDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
