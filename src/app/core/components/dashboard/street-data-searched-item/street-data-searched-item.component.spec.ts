import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreetDataSearchedItemComponent } from './street-data-searched-item.component';

describe('StreetDataSearchedItemComponent', () => {
  let component: StreetDataSearchedItemComponent;
  let fixture: ComponentFixture<StreetDataSearchedItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StreetDataSearchedItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StreetDataSearchedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
