import { Component, Input } from '@angular/core';
import { InputFieldErrorSectionComponent } from '../input-field-error-section/input-field-error-section.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputFieldHelperComponent } from '@shared/helper-components/input-field-helper/input-field-helper.component';
import { PwVisibilityIconComponent } from '../svgs/pw-visibility-icon/pw-visibility-icon.component';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [InputFieldErrorSectionComponent, ReactiveFormsModule, PwVisibilityIconComponent],
  templateUrl: './input-field.component.html',
  styles: `
    :host {
      display: contents
    }
  `
})
export class InputFieldComponent extends InputFieldHelperComponent {
  @Input({ required: true }) label!: string;  
  inputClx = this.getInputClx('shared-input')
}
