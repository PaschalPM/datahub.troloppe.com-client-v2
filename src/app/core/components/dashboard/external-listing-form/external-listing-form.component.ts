import { Component, Input, SimpleChanges } from '@angular/core';
import { ResourceCreationFormModalComponent } from '../modals/external-listings/resource-creation-form-modal/resource-creation-form-modal.component';
import { ExternalListingsService } from '@core/services/dashboard/external-listings.service';
import { FormDataService } from '@core/services/dashboard/property-data/form-data.service';
import { InitialDataService } from '@core/services/dashboard/property-data/initial-data.service';
import { ResourceCreationFormModalService } from '@core/services/dashboard/property-data/resource-creation-form-modal.service';
import { ModalService } from '@shared/services/modal.service';
import { SelectDropdownService } from '@shared/services/select-dropdown.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { forkJoin, Observable, Subject, takeUntil } from 'rxjs';
import { SelectDropdownComponent } from '@shared/components/select-dropdown/select-dropdown.component';
import { InputFieldComponent } from '@shared/components/input-field/input-field.component';
import { PptySearchableSelectDropdownComponent } from '@shared/components/ppty-searchable-select-dropdown/ppty-searchable-select-dropdown.component';
import { FormSubmitBtnComponent } from '@shared/components/form-submit-btn/form-submit-btn.component';
import { routeFadeInOut, visibleTrigger } from '@shared/animations';
import { CommonModule } from '@angular/common';
import { BackBtnComponent } from "../../../../shared/components/back-btn/back-btn.component";
import { SpinnerComponent } from "../../../../shared/components/spinner/spinner.component";

@Component({
  selector: 'app-external-listing-form',
  standalone: true,
  imports: [
    SelectDropdownComponent,
    InputFieldComponent,
    PptySearchableSelectDropdownComponent,
    ReactiveFormsModule,
    FormSubmitBtnComponent,
    CommonModule,
    BackBtnComponent,
    SpinnerComponent
],
  templateUrl: './external-listing-form.component.html',
  styleUrl: './external-listing-form.component.scss',
  animations: [routeFadeInOut, visibleTrigger],
  host: {
    '[@routeFadeInOut]': 'true',
    '[style.display]': 'contents',
  },
})
export class ExternalListingFormComponent {
  @Input() action: 'create' | 'edit' = 'create'
  @Input() data: any

  optionsRecord: Record<string, IdAndNameType[] | null> = {}
  isFetchingRecord: Record<string, boolean> = {}
  isLoading = false
  creationType: CreationType = 'create'

  externalListingFormGroup!: FormGroup;

  private destroy$ = new Subject<void>()
  constructor(
    private initialDataService: InitialDataService,
    private formDataService: FormDataService,
    private sds: SelectDropdownService,
    private modalService: ModalService,
    private resourceCreationFormModalService: ResourceCreationFormModalService,
    public externalListingService: ExternalListingsService
  ) {
    if (this.action == 'create')
      this.externalListingFormGroup = this.externalListingService.getFormGroup()
  }

  ngOnInit(): void {
    this.getInitialData()
    this.resourceCreationFormModalService.onResourceChanged((eventData) => {
      this.getInitialData(eventData)
    })
    this.sds.onAddBtnClick((outerFormGroup, formControlName) => {
      this.modalService.open(ResourceCreationFormModalComponent, { outerFormGroup, formControlName })
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    const dataInput = changes['data']
    if (this.action == 'edit' && dataInput.currentValue) {
      this.externalListingFormGroup = this.externalListingService.getFormGroup(dataInput.currentValue)
      this.setupOptionsInEditMode()
    }
  }
  private getInitialData(resource?: { name: string, data: IdAndNameType }) {
    const initialDataMap: Record<string, () => Observable<any>> = {
      state: () => this.initialDataService.getAllStates(),
      sector: () => this.initialDataService.getAllSectors(),
      offer: () => this.initialDataService.getAllOffers(),
    };

    if (resource) {
      const options = this.optionsRecord[resource.name]
      this.optionsRecord[resource.name] = options ? [resource.data, ...options] : [resource.data]
    }
    else {
      Object.entries(initialDataMap).forEach(([key, fetchData]) => {
        fetchData()
          .pipe(takeUntil(this.destroy$))
          .subscribe(v => {
            this.optionsRecord[key] = v
          })
      });
    }
  }

  private setupOptionsInEditMode() {

    const mapper: Record<string, Observable<IdAndNameType[]>> = {
      region: this.formDataService.getRegionsByStateId(this.data.state_id),
      location: this.formDataService.getLocationsByRegionId(this.data.region_id),
      section: this.formDataService.getSectionsByLocalityId(this.data.locality_id),
      lga: this.formDataService.getLgasByRegionId(this.data.region_id),
      lcda: this.formDataService.getLcdasByLgaId(this.data.lga_id),
      subSector: this.formDataService.getSubSectorsBySectorId(this.data.sector_id),
    }

    forkJoin(mapper).pipe(takeUntil(this.destroy$)).subscribe((result) => {
      for (let key in result) {
        this.optionsRecord[key] = result[key]
      }

    })
  }

  private onFieldChange(
    fieldName: string,
    selectedItem: IdAndNameType,
    fieldToChange: string,
    fetchMethod: (id: number) => Observable<IdAndNameType[]>,
    resetFields?: string[]
  ) {
    // A curry function !!!!
    const onChange = this.sds.onInitChangeBuilder(this.externalListingFormGroup, this.optionsRecord, this.isFetchingRecord);
    onChange(fieldToChange, selectedItem.id, (id) => fetchMethod(id), resetFields)
    this.externalListingService.dropdownSelectedData[fieldName] = selectedItem

  }

  onStateChange(selectedState: IdAndNameType) {
    if (selectedState) {
      this.onFieldChange('state', selectedState, 'region', (id) => this.formDataService.getRegionsByStateId(id), ['region', 'location', 'section', 'lga', 'lcda'])
    }
  }

  onRegionChange(selectedRegion: IdAndNameType) {
    if (selectedRegion) {
      this.onFieldChange("region", selectedRegion, "location", (id) => this.formDataService.getLocationsByRegionId(id), ['location', 'section', 'lga'])
      this.onFieldChange("region", selectedRegion, "lga", (regionId) => this.formDataService.getLgasByRegionId(regionId))
    }
  }

  onLocationChange(selectedLocation: IdAndNameType) {
    if (selectedLocation) {
      this.onFieldChange("location", selectedLocation, "section", (id) => this.formDataService.getSectionsByLocalityId(id), ['section'])
    }
  }

  onSectionChange(sectionItem: IdAndNameType) {
    //
  }

  onLgaChange(selectedLga: IdAndNameType) {
    if (selectedLga) {
      this.onFieldChange("lga", selectedLga, "lcda", (id) => this.formDataService.getLcdasByLgaId(id), ['lcda'])
    }
  }

  onSectorChange(selectedSector: IdAndNameType) {
    if (selectedSector) {
      this.onFieldChange("sector", selectedSector, 'subSector', (id) => this.formDataService.getSubSectorsBySectorId(id))
    }
  }

  handleSubmit() {
    if (this.action === 'create') {
      this.externalListingService.createExternalListing(this.creationType)
    }
    else {
      this.externalListingService.updateExternalListing(this.data.id)
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
    this.externalListingFormGroup.reset()
  }
}
