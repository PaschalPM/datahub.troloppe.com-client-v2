import { EventEmitter, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormSubmissionService {
  formSubmitEvent = new EventEmitter<{
    formGroup: FormGroup;
    isSubmitting: boolean;
  }>();

  constructor() { }

  onFormSubmission(formGroup: FormGroup) {
    this.formSubmitEvent.emit({ formGroup, isSubmitting: true });
  }
  
  onEndFormSubmission(formGroup: FormGroup) {
    this.formSubmitEvent.emit({ formGroup, isSubmitting: false });
  }
}
