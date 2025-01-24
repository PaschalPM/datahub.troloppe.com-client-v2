import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchableSelectDropdownComponent } from './searchable-select-dropdown.component';

describe('SearchableSelectDropdownComponent', () => {
  let component: SearchableSelectDropdownComponent;
  let fixture: ComponentFixture<SearchableSelectDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchableSelectDropdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchableSelectDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
