import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginEmailChangerComponent } from './login-email-changer.component';

describe('LoginEmailChangerComponent', () => {
  let component: LoginEmailChangerComponent;
  let fixture: ComponentFixture<LoginEmailChangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginEmailChangerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginEmailChangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
