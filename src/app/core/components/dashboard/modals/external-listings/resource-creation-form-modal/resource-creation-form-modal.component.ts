import { Component, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '@shared/services/modal.service';
import { InputFieldComponent } from "../../../../../../shared/components/input-field/input-field.component";
import { TextButtonComponent } from "../../../text-btn/text-btn.component";
import { SelectDropdownComponent } from "../../../../../../shared/components/select-dropdown/select-dropdown.component";
import { ExternalListingsService } from '@core/services/dashboard/external-listings.service';
import { UtilsService } from '@shared/services/utils.service';
import { AlertService } from '@shared/services/alert.service';
import { FormSubmissionService } from '@shared/services/form-submission.service';
import { IndexService } from '@core/services/dashboard/property-data/index.service';
import { Observable, Subject, takeUntil } from 'rxjs';
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

  private dependentSelectionMap: Record<string, string[]> = {
    region: ['state'],
    location: ['state', 'region'],
    section: ['state', 'region', 'location'],
    lga: ['state', 'region'],
    lcda: ['state', 'region', 'lga'],
    subSector: ['sector']
  }

  private resourceCreationMapper: Record<string, (data: any) => Observable<{ message: string }>> = {
    state: (data) => this.indexPropertyDataService.createState(data)
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly indexPropertyDataService: IndexService,
    private readonly resourceCreationFormModalService: ResourceCreationFormModalService,
    public readonly utils: UtilsService,
  ) {
    this.innerFormGroup = this.fb.group({})
  }

  get label() {
    return this.resourceCreationFormModalService.getLabel(this.formControlName)
  }

  ngOnInit(): void {
    this.resourceCreationFormModalService.syncInitialSelections(
      this.outerFormGroup,
      this.innerFormGroup,
      this.formControlName,
      this.dependentSelectionMap,
      this.preSelectedOptions
    )
  }

  addResource() {
    this.resourceCreationFormModalService.addResource(this.innerFormGroup, this.formControlName)
  }

}