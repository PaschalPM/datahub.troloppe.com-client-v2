import { NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UtilsService } from '@shared/services/utils.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { visibleTrigger } from '@shared/animations';
import { Subscription } from 'rxjs';
import { FormSubmissionService } from '@shared/services/form-submission.service';
import { InputFieldErrorSectionComponent } from '../input-field-error-section/input-field-error-section.component';


@Component({
  selector: 'app-select-dropdown',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    SpinnerComponent,
    InputFieldErrorSectionComponent,
  ],
  templateUrl: './select-dropdown.component.html',
  animations: [visibleTrigger],
  styles: `
  :host {
    width: 100%
  }
  `,
})
export class SelectDropdownComponent {
  @ViewChild('selectRef') selectRef!: ElementRef<HTMLDivElement>;

  @Input({ required: true }) label!: string;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) items!: Array<any> | null;
  @Input({ required: true }) formGroup!: FormGroup;
  @Input({ required: true }) bindValue!: string;
  @Input({ required: true }) bindLabel!: string;
  @Input() disableControlBasedOnData = false
  @Input() optionsNotFoundText?: string;

  @Input() clx!: string;
  @Input() pending = false;
  @Input() optionsLabel = '';

  @Output() changeEvent = new EventEmitter();

  control = new FormControl();
  isRequired = true;
  formIsSubmitting = false;
  displaySelect = true;
  selectClx = this.utils.cn(
    'select focus:outline-secondary w-full select-bordered rounded-md',
    { 'select-error': this.formIsSubmitting && this.control.errors }
  )

  private formSubmitSubscription!: Subscription;
  constructor(
    public utils: UtilsService,
    private formSubmit: FormSubmissionService
  ) { }

  ngOnInit(): void {
    this.control = this.formGroup.controls?.[this.name] as FormControl;
    this.control.value;
    this.isRequired = this.control.hasValidator(Validators.required);
    if (!this.items) {
      this.control.disable()
    }
    this.setFormIsSubmitting();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const currentValue = changes['items']?.currentValue;
    this.displaySelect = true

    if (currentValue) {
      this.control.enable();
      currentValue.length === 0 ? (this.displaySelect = false) : (this.displaySelect = true)
    }

    if (this.disableControlBasedOnData && !currentValue) {
      this.control.disable();
    }
  }
  onChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.control.setErrors(null);
    this.changeEvent.emit(target.value);
  }

  focus() {
    this.selectRef.nativeElement.focus();
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
    this.formSubmitSubscription.unsubscribe();
  }
}
