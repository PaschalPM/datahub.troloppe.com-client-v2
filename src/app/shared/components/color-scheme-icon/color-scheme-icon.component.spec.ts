import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorSchemeIconComponent } from './color-scheme-icon.component';

describe('ColorSchemeIconComponent', () => {
  let component: ColorSchemeIconComponent;
  let fixture: ComponentFixture<ColorSchemeIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorSchemeIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColorSchemeIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
