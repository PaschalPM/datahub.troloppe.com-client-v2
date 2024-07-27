import { Component, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LoginEmailChangerComponent } from '../login-email-changer/login-email-changer.component';
import { EmailVerificationAndLoginHelper } from '@core/helper-components/email-verification-and-login-helper';
import { InputFieldComponent } from '../input-field/input-field.component';
import { FormSubmitBtnComponent } from '@shared/components/form-submit-btn/form-submit-btn.component';
import { FormSubmissionService } from '@shared/services/form-submission.service';
import { AuthService } from '@shared/services/auth.service';
import { AlertService } from '@shared/services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router,
    private activatedRoute: ActivatedRoute
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
        next: () => {
          this.alertService.success('Success: Successfully logged in.');
          this.activatedRoute.queryParams.subscribe((params) => {
            if (params['returnUrl']) {
              this.router.navigateByUrl(params['returnUrl']);
            } else {
              this.router.navigateByUrl('/dashboard');
            }
          });
        },
        error: (err) => {
          this.loginFormGroup.get('password')?.setErrors({
            serverError: {
              message: err.error.message,
            },
          });
          this.loading = false;
        },
      });
    }
  }

  ngAfterViewInit(): void {
    this.passwordInputField.inputFocus();
  }
}
