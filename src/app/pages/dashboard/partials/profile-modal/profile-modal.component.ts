import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputFieldComponent } from '@shared/components/input-field/input-field.component';
import { AlertService } from '@shared/services/alert.service';
import { AuthService } from '@shared/services/auth.service';
import { LoaderService } from '@shared/services/loader.service';
import { ModalService } from '@shared/services/modal.service';
import { TextButtonComponent } from '@core/components/dashboard/text-btn/text-btn.component';
import { FormSubmissionService } from '@shared/services/form-submission.service';

@Component({
  selector: 'app-profile-modal',
  standalone: true,
  imports: [ReactiveFormsModule, InputFieldComponent, TextButtonComponent],
  templateUrl: './profile-modal.component.html',
})
export class ProfileModalComponent {
  profileFormGroup!: FormGroup;

  nameController = new FormControl({ value: '', disabled: true });
  emailController = new FormControl({ value: '', disabled: true });
  roleController = new FormControl({ value: '', disabled: true });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private formSubmit: FormSubmissionService,
    private alertService: AlertService,
    private loader: LoaderService,
    private modal: ModalService
  ) {
    this.profileFormGroup = this.fb.group(
      {
        name: this.nameController,
        email: this.emailController,
        role: this.roleController,
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      { updateOn: 'submit' }
    );
  }

  ngOnInit(): void {
    this.auth.onCurrentUser().subscribe((currentUser) => {
      this.nameController.setValue(currentUser?.name as string);
      this.emailController.setValue(currentUser?.email as string);
      this.roleController.setValue(currentUser?.roles[0] as string);
    });
  }

  onSubmit() {
    this.formSubmit.onFormSubmission();
    if (this.profileFormGroup.valid) {
      this.loader.start();
      const body = {
        email: this.emailController.value as string,
        password: this.profileFormGroup.value.newPassword,
      };
      this.auth.changePassword(body).subscribe((value) => {
        this.alertService.success('Success: ' + value.message);
        this.loader.stop();
        this.modal.close();
      });
    }
  }
}
