import { Component, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { EmailVerificationAndLoginHelper } from '@core/classes/email-verification-and-login-helper';
import { LoginEmailChangerComponent } from '../login-email-changer/login-email-changer.component';
import { InputFieldComponent } from '@shared/components/input-field/input-field.component';
import { FormSubmitBtnComponent } from '@shared/components/form-submit-btn/form-submit-btn.component';
import { FormSubmissionService } from '@shared/services/form-submission.service';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'auth-login-stage',
  standalone: true,
  imports: [
    LoginEmailChangerComponent,
    InputFieldComponent,
    FormSubmitBtnComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './login-stage.component.html',
})
export class LoginStageComponent extends EmailVerificationAndLoginHelper {
  @ViewChild('passwordInputField') passwordInputField!: InputFieldComponent;
  emailControl!: FormControl;

  constructor(
    private formSubmit: FormSubmissionService,
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit(): void {
    this.emailControl = this.loginFormGroup.get('email') as FormControl;
  }

  switchToVerifyEmailStage() {
    this.switchStage('VERIFY_EMAIL');
  }

  onLogin() {
    this.formSubmit.onFormSubmission();
    if (this.loginFormGroup.valid) {
      this.loading = true;
      this.authService.signIn(this.loginFormGroup.value).subscribe({
        next: () => {},
        error: (err) => {},
      });
    }
  }

  ngAfterViewInit(): void {
    this.passwordInputField.inputFocus();
  }
}
