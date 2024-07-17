import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActionBtnComponent } from './user-action-btn.component';

describe('UserActionBtnComponent', () => {
  let component: UserActionBtnComponent;
  let fixture: ComponentFixture<UserActionBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserActionBtnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserActionBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
