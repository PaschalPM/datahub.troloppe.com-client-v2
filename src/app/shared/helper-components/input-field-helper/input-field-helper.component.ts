import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormSubmissionService } from '@shared/services/form-submission.service';
import { UtilsService } from '@shared/services/utils.service';
import { Subscription } from 'rxjs';

@Component({
  template: '',
  styles: `
    :host {
      display: contents
    }
  `
})
export class InputFieldHelperComponent {
  @Input({ required: true }) formGroup!: FormGroup;
  @Input({ required: true }) name!: string;
  @Input() formName = '';
  @Input() type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'number-list' | 'checkbox' = 'text';
  @Input() placeholder = '';
  @Input() clx = '';
  @Input() forgetPassword = false;
  @Input() maxLength = 250;


  @ViewChild('passwordInputElement', { static: false })
  passwordInputElement!: ElementRef<HTMLInputElement>;

  @ViewChild('nonPasswordInputElement', { static: false })
  nonPasswordInputElement!: ElementRef<HTMLInputElement>;

  control!: FormControl;
  formIsSubmitting = false;
  displayPassword = false;


  private formSubmitSubscription!: Subscription;

  get pwVisibilityClx() {
    return this.utils.cn(
      'absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-base',
      {
        'text-error': this.formIsSubmitting && this.control.errors,
      }
    );
  }

  constructor(
    public utils: UtilsService,
    protected formSubmit: FormSubmissionService
  ) { }

  ngOnInit(): void {
    this.control = this.formGroup.get(this.name) as FormControl;
    this.setFormIsSubmitting();
  }

  protected setFormIsSubmitting() {
    this.formSubmitSubscription = this.formSubmit.formSubmitEvent.subscribe(
      (value) => {
        if (value.formName === 'form') {
          this.formIsSubmitting = value.isSubmitting;
        }
      }
    );
  }

  private baseInputClx = 'input input-bordered w-full rounded-md transition-all'
  protected getBaseInputClx(variant: 'shared-input' | 'auth-input') {
    return this.utils.cn(
      this.baseInputClx,
      {
        'focus:outline-secondary': variant === 'shared-input',
        'input-info': variant === 'auth-input',
        'pr-10': this.type === 'password',
      }
    );
  }

  get errorClx() {
    return this.formIsSubmitting && this.control.errors ? 'input-error' : ''
  }

  inputFocus() {
    if (this.type === 'password') {
      this.passwordInputElement.nativeElement.focus();
    } else {
      this.nonPasswordInputElement.nativeElement.focus();
    }
  }
  toggleVisibility() {
    this.displayPassword = !this.displayPassword;
    setTimeout(() => {
      this.passwordInputElement?.nativeElement.focus();
      this.passwordInputElement?.nativeElement.setSelectionRange(-1, -1);
    });
  }

  ngOnDestroy(): void {
    this.formSubmitSubscription.unsubscribe();
  }
}
