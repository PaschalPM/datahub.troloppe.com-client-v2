import { Component, Input } from '@angular/core';
import { InputFieldErrorSectionComponent } from '../input-field-error-section/input-field-error-section.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputFieldHelperComponent } from '@shared/helper-components/input-field-helper/input-field-helper.component';
import { PwVisibilityIconComponent } from '../svgs/pw-visibility-icon/pw-visibility-icon.component';
import { NgIf } from '@angular/common';
import { SpinnerComponent } from "../spinner/spinner.component";
import { visibleTrigger } from '@shared/animations';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [InputFieldErrorSectionComponent, ReactiveFormsModule, PwVisibilityIconComponent, NgIf, SpinnerComponent],
  templateUrl: './input-field.component.html',
  styles: `
    :host {
      display: contents
    }
  `,
  animations: [visibleTrigger]
})
export class InputFieldComponent extends InputFieldHelperComponent {
  @Input({ required: true }) label!: string;
  @Input() dataList: string[] = [];
  @Input() withCounter = false
  @Input() pending = false
  inputClx = ''
  isRequired = false
  currentLength = 0;

  override ngOnInit(): void {
    this.control = this.formGroup.controls?.[this.name] as FormControl;
    this.isRequired = this.control.hasValidator(Validators.required);
    if (this.name ==='size'){
      console.log(this.isRequired)
    }
    this.setFormIsSubmitting();
    this.inputClx = this.getBaseInputClx('shared-input')
    if (this.control.value) {
      this.currentLength = this.control.value.length
    }
  }

  setCurrentLength(event: Event) {
    const target = event.target as HTMLInputElement;
    this.currentLength = target.value.length

    if (this.currentLength >= this.maxLength) {
      this.control.setValue(target.value.slice(0, -1));
    }
  }
}
