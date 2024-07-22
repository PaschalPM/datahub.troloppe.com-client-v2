import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { NgIf } from '@angular/common';
import { UtilsService } from '@shared/services/utils.service';
import { FormSubmissionService } from '@shared/services/form-submission.service';
import { inputErrorTrigger } from '@shared/animations';
import { Subscription } from 'rxjs';
import { PwVisibilityIconComponent } from '../svgs/pw-visibility-icon/pw-visibility-icon.component';
import { Router } from '@angular/router';
import { CacheService } from '@shared/services/cache.service';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [
    CapitalizePipe,
    NgIf,
    ReactiveFormsModule,
    PwVisibilityIconComponent,
  ],
  templateUrl: './input-field.component.html',
  styles: `
    :host{
      display: contents;
    }
  `,
  animations: [inputErrorTrigger],
})
export class InputFieldComponent {
  @Input({ required: true }) formGroup!: FormGroup;
  @Input({ required: true }) name!: string;
  @Input() formName = '';
  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input() placeholder = '';
  @Input() clx = '';
  @Input() forgetPassword = false;
  @Input() emailToResetControl!: FormControl;

  @ViewChild('passwordInputElement', { static: false })
  passwordInputElement!: ElementRef<HTMLInputElement>;

  @ViewChild('nonPasswordInputElement', { static: false })
  nonPasswordInputElement!: ElementRef<HTMLInputElement>;

  control!: FormControl;
  formIsSubmitting = false;
  displayPassword = false;

  get inputClx() {
    return this.utils.cn(
      'input input-bordered input-info w-full rounded-md transition-all',
      {
        'input-error': this.formIsSubmitting && this.control.errors,
        'pr-10': this.type === 'password',
      }
    );
  }

  get pwVisibilityClx() {
    return this.utils.cn(
      'absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-base',
      {
        'text-error': this.formIsSubmitting && this.control.errors,
      }
    );
  }
  private formSubmitSubscription!: Subscription;

  constructor(
    public utils: UtilsService,
    private formSubmit: FormSubmissionService,
    private router: Router,
    private cache: CacheService
  ) {}

  ngOnInit(): void {
    this.control = this.formGroup.get(this.name) as FormControl;
    this.setFormIsSubmitting();
  }

  toggleVisibility() {
    this.displayPassword = !this.displayPassword;
    setTimeout(() => {
      this.passwordInputElement?.nativeElement.focus();
      this.passwordInputElement?.nativeElement.setSelectionRange(-1, -1);
    });
  }

  routeToForgotPassword() {
    if (this.emailToResetControl.value && this.forgetPassword) {
      this.cache.set('emailForReset', this.emailToResetControl.value)
    }
    this.router.navigateByUrl('/forgot-password');
  }

  inputFocus() {
    if (this.type === 'password') {
      this.passwordInputElement.nativeElement.focus();
    } else {
      this.nonPasswordInputElement.nativeElement.focus();
    }
  }

  ngOnDestroy(): void {
    this.formSubmitSubscription.unsubscribe();
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
}
