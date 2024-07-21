import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { NgIf } from '@angular/common';
import { UtilsService } from '@shared/services/utils.service';
import { FormSubmissionService } from '@shared/services/form-submission.service';
import { inputErrorTrigger } from '@shared/animations';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [CapitalizePipe, NgIf, ReactiveFormsModule],
  templateUrl: './input-field.component.html',
  styles: `
    :host{
      display: contents;
    }
  `,
  animations: [inputErrorTrigger]
})
export class InputFieldComponent {
  @Input({ required: true }) formGroup!: FormGroup;
  @Input({ required: true }) name!: string;
  @Input() formName = '';
  @Input() type: 'text' | 'email' = 'text';
  @Input() placeholder = '';

  formIsSubmitting = false;
  control!: FormControl;

  constructor(
    public utils: UtilsService,
    private formSubmit: FormSubmissionService
  ) {}

  ngOnInit(): void {
    this.control = this.formGroup.get(this.name) as FormControl;
    this.setFormIsSubmitting()
  }

  private setFormIsSubmitting() {
    this.formSubmit.formSubmitEvent.subscribe((value) => {
      if (value.formName === 'form') {
        this.formIsSubmitting = value.isSubmitting;
      }
    });
  }
}
