import { Component } from '@angular/core';
import { BackBtnComponent } from "../../../../../shared/components/back-btn/back-btn.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputFieldComponent } from "../../../../../shared/components/input-field/input-field.component";
import { UtilsService } from '@shared/services/utils.service';
import { FormSubmitBtnComponent } from "../../../../../shared/components/form-submit-btn/form-submit-btn.component";
import { ListingsAgentsService } from '@core/services/dashboard/listings-agents.service';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [BackBtnComponent, InputFieldComponent, FormSubmitBtnComponent, ReactiveFormsModule],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss'
})
export class NewComponent {
  agentFormGroup!: FormGroup
  creationType: CreationType = 'create'
  isLoading = false

  constructor(
    private readonly utils: UtilsService,
    private readonly listingAgentService: ListingsAgentsService
  ) {
    this.agentFormGroup = this.listingAgentService.getFormGroup()
  }

  get formGroupKeys() {
    return Object.keys(this.agentFormGroup.controls)
  }

  getLabel(name: string) {
    return this.utils.capitalize(name)
  }

  handleSubmit() {
    // this.listingAgentService.createAgent(this.creationType)
  }
}
