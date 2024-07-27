import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { routeFadeInOut } from '@shared/animations';
import { BrandLogoComponent } from '@shared/components/brand-logo/brand-logo.component';
import { FormSubmitBtnComponent } from '@shared/components/form-submit-btn/form-submit-btn.component';
import { InputFieldComponent } from '@core/components/auth/input-field/input-field.component';
import { AlertService } from '@shared/services/alert.service';
import { AuthService } from '@shared/services/auth.service';
import { FormSubmissionService } from '@shared/services/form-submission.service';
import { matchFields } from '@shared/validators/match-fields';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormSubmitBtnComponent,
    InputFieldComponent,
    BrandLogoComponent,
  ],
  templateUrl: './reset-password.component.html',
  animations: [routeFadeInOut],
  host: {
    '[@routeFadeInOut]': 'true',
    '[style.display]': 'contents',
  },
})
export class ResetPasswordComponent {
  resetPasswordFormGroup!: FormGroup;
  loading = false;

  private authResetPasswordSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private formSubmit: FormSubmissionService,
    private alertService: AlertService
  ) {
    this.resetPasswordFormGroup = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        token: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        password_confirmation: ['', [Validators.required]],
      },
      {
        updateOn: 'submit',
        validators: [matchFields('password', 'password_confirmation')],
      }
    );
  }

  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    this.resetPasswordFormGroup
      .get('email')
      ?.setValue(urlParams.get('email') ?? urlParams.get('amp;email'));
    this.resetPasswordFormGroup.get('token')?.setValue(urlParams.get('token'));
  }

  onResetPassword() {
    this.formSubmit.onFormSubmission();

    if (this.resetPasswordFormGroup.valid) {
      this.loading = true;

      this.authResetPasswordSubscription = this.authService
        .resetPassword(this.resetPasswordFormGroup.value)
        .subscribe({
          next: (value) => {
            this.alertService.success(value.message);
          },
          error: (err: HttpErrorResponse) => {
            if (err.status === 422) {
              this.alertService.error('Error: Invalid or expired token');
            } else {
              this.alertService.error(err.message);
            }
            this.loading = false;
          },
          complete: () => {
            this.loading = false;
            this.router.navigateByUrl('/sign-in');
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.authResetPasswordSubscription.unsubscribe();
  }
}
