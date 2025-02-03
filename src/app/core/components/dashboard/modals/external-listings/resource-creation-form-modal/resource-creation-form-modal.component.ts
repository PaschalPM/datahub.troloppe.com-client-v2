import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InputFieldComponent } from "../../../../../../shared/components/input-field/input-field.component";
import { TextButtonComponent } from "../../../text-btn/text-btn.component";
import { SelectDropdownComponent } from "../../../../../../shared/components/select-dropdown/select-dropdown.component";
import { UtilsService } from '@shared/services/utils.service';
import { ResourceCreationFormModalService } from '@core/services/dashboard/property-data/resource-creation-form-modal.service';

@Component({
  selector: 'app-resource-creation-form-modal',
  standalone: true,
  imports: [InputFieldComponent, TextButtonComponent, SelectDropdownComponent],
  templateUrl: './resource-creation-form-modal.component.html',
  styleUrl: './resource-creation-form-modal.component.scss'
})
export class ResourceCreationFormModalComponent {
  @Input({ required: true }) outerFormGroup!: FormGroup
  @Input({ required: true }) formControlName!: string

  innerFormGroup!: FormGroup
  preSelectedOptions: { itemName: string, items: IdAndNameType[], label: string }[] = []
  inputFields: { label: string, name: string }[] = []

  constructor(
    private readonly fb: FormBuilder,
    private readonly resourceCreationFormModalService: ResourceCreationFormModalService,
    public readonly utils: UtilsService,
  ) {
    this.innerFormGroup = this.fb.group({})
  }

  get hasPreSelectedOptions() {
    return !!this.preSelectedOptions.length
  }

  get label() {
    return this.resourceCreationFormModalService.getLabel(this.formControlName)
  }

  ngOnInit(): void {
    this.resourceCreationFormModalService.prepareFormState(
      this.outerFormGroup,
      this.innerFormGroup,
      this.formControlName,
      this.preSelectedOptions,
      this.inputFields
    )
  }

  addResource() {
    this.resourceCreationFormModalService.addResource(this.innerFormGroup, this.formControlName)
  }

}