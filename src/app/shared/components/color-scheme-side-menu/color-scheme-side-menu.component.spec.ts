import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorSchemeSideMenuComponent } from './color-scheme-side-menu.component';

describe('ColorSchemeSideMenuComponent', () => {
  let component: ColorSchemeSideMenuComponent;
  let fixture: ComponentFixture<ColorSchemeSideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorSchemeSideMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColorSchemeSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
