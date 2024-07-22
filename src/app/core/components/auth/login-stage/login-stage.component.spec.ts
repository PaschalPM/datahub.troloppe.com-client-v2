import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginStageComponent } from './login-stage.component';

describe('LoginStageComponent', () => {
  let component: LoginStageComponent;
  let fixture: ComponentFixture<LoginStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginStageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
