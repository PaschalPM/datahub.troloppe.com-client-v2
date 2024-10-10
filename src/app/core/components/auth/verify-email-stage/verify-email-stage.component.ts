import { Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputFieldComponent } from '../input-field/input-field.component';
import { FormSubmissionService } from '@shared/services/form-submission.service';
import { FormSubmitBtnComponent } from '@shared/components/form-submit-btn/form-submit-btn.component';
import { AuthService } from '@shared/services/auth.service';
import { EmailVerificationAndLoginHelper } from '@core/helper-components/email-verification-and-login-helper';

@Component({
  selector: 'auth-verify-email-stage',
  standalone: true,
  imports: [InputFieldComponent, ReactiveFormsModule, FormSubmitBtnComponent],
  templateUrl: './verify-email-stage.component.html',
  styles: `
    :host {
      display: contents
    }
  `,
})
export class VerifyEmailStageComponent extends EmailVerificationAndLoginHelper {
  @ViewChild('emailInputField') emailInputField!: InputFieldComponent;

  constructor(
    private formSubmit: FormSubmissionService,
    private authService: AuthService
  ) {
    super();
  }

  onEmailVerification() {
    this.formSubmit.onFormSubmission();
    if (this.loginFormGroup.get('email')?.valid) {
      this.loading = true;
      this.authService.verifyUserByEmail(this.loginFormGroup.value).subscribe({
        next: () => {
          this.switchStage('LOGIN_STAGE');
        },
        error: (err) => {
          this.loginFormGroup.get('email')?.setErrors({
            serverError: {
              message: err.error.message ?? 'Oops something went wrong.',
            },
          });
          this.loading = false;
        },
      });
    }
  }

  ngAfterViewInit(): void {
    this.emailInputField.focus()
  }
}
