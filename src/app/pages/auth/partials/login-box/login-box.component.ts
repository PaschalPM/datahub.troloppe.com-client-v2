import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandLogoComponent } from '@shared/components/brand-logo/brand-logo.component';
import { InputFieldComponent } from '@shared/components/input-field/input-field.component';
import { VerifyEmailStageComponent } from '@core/components/auth/verify-email-stage/verify-email-stage.component';
import { LoginStageComponent } from '@core/components/auth/login-stage/login-stage.component';

@Component({
  selector: 'auth-login-box',
  standalone: true,
  imports: [
    BrandLogoComponent,
    InputFieldComponent,
    VerifyEmailStageComponent,
    LoginStageComponent,
  ],
  templateUrl: './login-box.component.html',
})
export class LoginBoxComponent {
  loginFormGroup!: FormGroup;
  stage: EmailVerificationAndLoginStageType = 'VERIFY_EMAIL';

  constructor(private fb: FormBuilder) {
    this.loginFormGroup = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
      },
      {
        updateOn: 'submit',
      }
    );
  }
}
