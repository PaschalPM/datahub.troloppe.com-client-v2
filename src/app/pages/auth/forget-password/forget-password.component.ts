import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { routeFadeInOut } from '@shared/animations';
import { BrandLogoComponent } from '@shared/components/brand-logo/brand-logo.component';
import { FormSubmitBtnComponent } from '@shared/components/form-submit-btn/form-submit-btn.component';
import { InputFieldComponent } from '@shared/components/input-field/input-field.component';
import { AuthService } from '@shared/services/auth.service';
import { CacheService } from '@shared/services/cache.service';
import { ClientStorageService } from '@shared/services/client-storage.service';
import { EMAIL_FOR_RESET_PASSWORD } from '@shared/services/constants/localstorage';
import { FormSubmissionService } from '@shared/services/form-submission.service';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BrandLogoComponent,
    InputFieldComponent,
    FormSubmitBtnComponent,
  ],
  templateUrl: './forget-password.component.html',
  animations: [routeFadeInOut('100vh')],
  host: {
    '[@routeFadeInOut]': 'true',
    '[style.display]': 'contents',
  },
})
export class ForgetPasswordComponent {
  @ViewChild('emailInputField') emailInputField!: InputFieldComponent;
  forgotPasswordFormGroup!: FormGroup;
  loading = false;

  constructor(
    private cache: CacheService,
    private fb: FormBuilder,
    private formSubmit: FormSubmissionService,
    private authService: AuthService,
    private css: ClientStorageService
  ) {
    console.log(this.cache.get('emailForReset'));
    this.forgotPasswordFormGroup = this.fb.group({
      email: [
        this.cache.get('emailForReset'),
        [Validators.required, Validators.email],
      ],
    });
  }

  onSendResetLinkMail() {
    this.formSubmit.onFormSubmission();

    if (this.forgotPasswordFormGroup.valid) {
      const emailControl = this.forgotPasswordFormGroup.get('email')
      this.cache.remove('emailForReset');
      this.loading = true;
      this.authService
        .forgotPassword(this.forgotPasswordFormGroup.value)
        .subscribe({
          next: (value) => {
            alert(value.message);
            this.loading = false;
            this.css.local().set(EMAIL_FOR_RESET_PASSWORD, emailControl?.value)
          },
          error: (err) => {
            console.error(err.error.message);
            emailControl?.setErrors({
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
    this.emailInputField.inputFocus();
  }
}
