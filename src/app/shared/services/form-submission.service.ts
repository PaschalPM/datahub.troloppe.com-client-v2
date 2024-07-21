import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormSubmissionService {
  formSubmitEvent = new EventEmitter<{
    formName: string;
    isSubmitting: boolean;
  }>();

  constructor() {}

  onFormSubmission(formName: string = 'form') {
    this.formSubmitEvent.emit({ formName, isSubmitting: true });
  }
}
