import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBackdropComponent } from './menu-backdrop.component';

describe('MenuBackdropComponent', () => {
  let component: MenuBackdropComponent;
  let fixture: ComponentFixture<MenuBackdropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuBackdropComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuBackdropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
