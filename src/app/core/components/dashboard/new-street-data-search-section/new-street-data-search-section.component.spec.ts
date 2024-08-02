import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStreetDataSearchSectionComponent } from './new-street-data-search-section.component';

describe('NewStreetDataSearchSectionComponent', () => {
  let component: NewStreetDataSearchSectionComponent;
  let fixture: ComponentFixture<NewStreetDataSearchSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewStreetDataSearchSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewStreetDataSearchSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
