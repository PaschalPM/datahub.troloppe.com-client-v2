import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputFieldComponent } from '@shared/components/input-field/input-field.component';
import { FormSubmissionService } from '@shared/services/form-submission.service';
import { FormSubmitBtnComponent } from '../../../../shared/components/form-submit-btn/form-submit-btn.component';

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
export class VerifyEmailStageComponent {
  @Input({ required: true }) loginFormGroup!: FormGroup;
  loading = false;

  constructor(private formSubmit: FormSubmissionService) {}

  onEmailVerification() {
    this.formSubmit.onFormSubmission();
    if (this.loginFormGroup.get('email')?.valid){
      this.loading = true;
    }
  }
}
