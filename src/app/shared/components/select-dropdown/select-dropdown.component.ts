import { NgIf } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UtilsService } from '@shared/services/utils.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { visibleTrigger } from '@shared/animations';
import { Subscription } from 'rxjs';
import { FormSubmissionService } from '@shared/services/form-submission.service';
import { InputFieldErrorSectionComponent } from "../input-field-error-section/input-field-error-section.component";
import { Element } from '@angular/compiler';

@Component({
  selector: 'app-select-dropdown',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, SpinnerComponent, InputFieldErrorSectionComponent],
  templateUrl: './select-dropdown.component.html',
  animations: [visibleTrigger]
})
export class SelectDropdownComponent {
  @ViewChild("selectRef") selectRef !:ElementRef<HTMLDivElement>

  @Input({ required: true }) label!: string;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) items!: Array<any>;
  @Input({ required: true }) formGroup!: FormGroup;
  @Input({ required: true }) bindValue!: string;
  @Input({ required: true }) bindLabel!: string;

  @Input() clx!: string;
  @Input() pending = false
  @Input() optionsLabel = ''

  @Output() changeEvent = new EventEmitter();

  control = new FormControl();
  isRequired = true;
  formIsSubmitting = false

  private formSubmitSubscription!: Subscription
  constructor(public utils: UtilsService, private formSubmit: FormSubmissionService) { }

  ngOnInit(): void {
    this.control = this.formGroup.controls?.[this.name] as FormControl;
    this.control.value;
    this.isRequired = this.control.hasValidator(Validators.required);
    this.setFormIsSubmitting()
  }

  onChange(event: Event) {
    const target = (event.target as HTMLSelectElement)
    this.control.setErrors(null);
    this.changeEvent.emit(target.value);
  }

  focus(){
    this.selectRef.nativeElement.focus()
  }

  private setFormIsSubmitting() {
    this.formSubmitSubscription = this.formSubmit.formSubmitEvent.subscribe(
      (value) => {
        if (value.formName === 'form') {
          this.formIsSubmitting = value.isSubmitting;
        }
      }
    );
  }

  ngOnDestroy() {
    this.formSubmitSubscription.unsubscribe()
  }
}
