import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { routeFadeInOut, visibleTrigger } from '@shared/animations';
import { InputFieldComponent } from '@shared/components/input-field/input-field.component';
import { SelectDropdownComponent } from '@shared/components/select-dropdown/select-dropdown.component';
import { InitialDataService } from '@core/services/dashboard/property-data/initial-data.service';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { SelectDropdownService } from '@shared/services/select-dropdown.service';
import { FormDataService } from '@core/services/dashboard/property-data/form-data.service';
import { PptySearchableSelectDropdownComponent } from "../../../../shared/components/ppty-searchable-select-dropdown/ppty-searchable-select-dropdown.component";
import { ModalService } from '@shared/services/modal.service';
import { ResourceCreationFormModalComponent } from '@core/components/dashboard/modals/external-listings/resource-creation-form-modal/resource-creation-form-modal.component';
import { ExternalListingsService } from '@core/services/dashboard/external-listings.service';
import { ResourceCreationFormModalService } from '@core/services/dashboard/property-data/resource-creation-form-modal.service';


@Component({
  selector: 'app-new',
  standalone: true,
  imports: [SelectDropdownComponent, AsyncPipe, InputFieldComponent, PptySearchableSelectDropdownComponent, ReactiveFormsModule],
  templateUrl: './new.component.html',
  animations: [routeFadeInOut, visibleTrigger],
  host: {
    '[@routeFadeInOut]': 'true',
    '[style.display]': 'contents',
  },
})
export class NewComponent implements OnDestroy {
  optionsRecord: Record<string, IdAndNameType[] | null> = {}
  isFetchingRecord: Record<string, boolean> = {}

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
    this.externalListingFormGroup = this.externalListingService.formGroup
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

  private getInitialData(resource?: { name: string, data: IdAndNameType }) {
    const initialDataMap: Record<string, () => Observable<any>> = {
      state: () => this.initialDataService.getAllStates(),
      sector: () => this.initialDataService.getAllSectors(),
      offer: () => this.initialDataService.getAllOffers(),
    };

    if (resource) {
      const options = this.optionsRecord[resource.name]
      this.optionsRecord[resource.name] = options ? [resource.data, ...options] : null
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
      this.onFieldChange('state', selectedState, 'region', (id) => this.formDataService.getRegionsByStateId(id), ['region', 'location', 'section', 'lga'])
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
      this.onFieldChange("location", selectedLocation, "section", (id) => this.formDataService.getSectionsByLocationId(id), ['section'])
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

  handleSubmit(formData: Event) {

  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
