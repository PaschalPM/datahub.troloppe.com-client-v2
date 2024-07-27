import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { inputErrorTrigger } from '@shared/animations';
import { CapitalizePipe } from '@shared/pipes/capitalize.pipe';

@Component({
  selector: 'app-input-field-error-section',
  standalone: true,
  imports: [CapitalizePipe, NgIf],
  templateUrl: './input-field-error-section.component.html',
  styles: `
    :host{
      display:contents
    }
  `,
  animations: [inputErrorTrigger],
})
export class InputFieldErrorSectionComponent {
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) formIsSubmitting!: boolean;
}
