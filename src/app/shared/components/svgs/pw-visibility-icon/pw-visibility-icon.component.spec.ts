import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PwVisibilityIconComponent } from './pw-visibility-icon.component';

describe('PwVisibilityIconComponent', () => {
  let component: PwVisibilityIconComponent;
  let fixture: ComponentFixture<PwVisibilityIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PwVisibilityIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PwVisibilityIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
