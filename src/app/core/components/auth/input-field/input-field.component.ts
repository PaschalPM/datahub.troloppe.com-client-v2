import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { UtilsService } from '@shared/services/utils.service';
import { FormSubmissionService } from '@shared/services/form-submission.service';
import { PwVisibilityIconComponent } from '@shared/components/svgs/pw-visibility-icon/pw-visibility-icon.component';
import { Router } from '@angular/router';
import { CacheService } from '@shared/services/cache.service';
import { InputFieldErrorSectionComponent } from '@shared/components/input-field-error-section/input-field-error-section.component';
import { InputFieldHelperComponent } from '@shared/helper-components/input-field-helper/input-field-helper.component';

@Component({
  selector: 'auth-input-field',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    PwVisibilityIconComponent,
    InputFieldErrorSectionComponent,
  ],
  templateUrl: './input-field.component.html',
  styles: `
    :host{
      display: contents;
    }
  `,
})
export class InputFieldComponent extends InputFieldHelperComponent {
  @Input() emailToResetControl!: FormControl;
  inputClx = this.getInputClx('auth-input')

  constructor(
    utils: UtilsService,
    formSubmit: FormSubmissionService,
    private router: Router,
    private cache: CacheService
  ) {
    super(utils, formSubmit);
  }

  routeToForgotPassword() {
    if (this.emailToResetControl.value && this.forgetPassword) {
      this.cache.set('emailForReset', this.emailToResetControl.value);
    }
    this.router.navigateByUrl('/forgot-password');
  }
}
