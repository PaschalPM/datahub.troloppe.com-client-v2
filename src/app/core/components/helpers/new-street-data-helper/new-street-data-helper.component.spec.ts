import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStreetDataHelperComponent } from './new-street-data-helper.component';

describe('NewStreetDataHelperComponent', () => {
  let component: NewStreetDataHelperComponent;
  let fixture: ComponentFixture<NewStreetDataHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewStreetDataHelperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewStreetDataHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
