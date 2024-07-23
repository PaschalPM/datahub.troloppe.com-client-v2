import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { routeFadeInOut } from '@shared/animations';
import { BrandLogoComponent } from '@shared/components/brand-logo/brand-logo.component';
import { FormSubmitBtnComponent } from '@shared/components/form-submit-btn/form-submit-btn.component';
import { InputFieldComponent } from '@shared/components/input-field/input-field.component';
import { AuthService } from '@shared/services/auth.service';
import { ClientStorageService } from '@shared/services/client-storage.service';
import { EMAIL_FOR_RESET_PASSWORD } from '@shared/services/constants/localstorage';
import { FormSubmissionService } from '@shared/services/form-submission.service';
import { matchFields } from '@shared/validators/match-fields';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, FormSubmitBtnComponent, InputFieldComponent, BrandLogoComponent],
  templateUrl: './reset-password.component.html',
  animations: [routeFadeInOut('100vh')],
  host: {
    '[@routeFadeInOut]': 'true',
    '[style.display]': 'contents',
  },
})
export class ResetPasswordComponent {
  resetPasswordFormGroup!: FormGroup;
  loading = false;

  private queryParamsSubscription!: Subscription;
  private authResetPasswordSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private css: ClientStorageService,
    private authService: AuthService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private formSubmit: FormSubmissionService
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
    this.queryParamsSubscription = this.activeRoute.queryParams.subscribe(
      (params) => {
        const email = this.css.local().get(EMAIL_FOR_RESET_PASSWORD);
        const token = params['token'];
        this.resetPasswordFormGroup.get('email')?.setValue(email);
        this.resetPasswordFormGroup.get('token')?.setValue(token);
      }
    );
  }

  onResetPassword() {
    this.formSubmit.onFormSubmission();
    console.log(this.resetPasswordFormGroup.value);

    if (this.resetPasswordFormGroup.valid) {
      this.loading = true;

      this.authResetPasswordSubscription = this.authService
        .resetPassword(this.resetPasswordFormGroup.value)
        .subscribe({
          next: (value) => {
            alert(value.message);
          },
          error: (err: HttpErrorResponse) => {
            if (err.status === 422) {
              alert('Error: Invalid or expired token');
            } else {
              alert(err.message);
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
    this.queryParamsSubscription.unsubscribe();
    this.authResetPasswordSubscription.unsubscribe()
  }
}
