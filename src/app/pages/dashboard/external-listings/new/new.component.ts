import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { routeFadeInOut, visibleTrigger } from '@shared/animations';
import { InputFieldComponent } from '@shared/components/input-field/input-field.component';
import { SelectDropdownComponent } from '@shared/components/select-dropdown/select-dropdown.component';
import { InitialDataService } from '@core/services/dashboard/property-data/initial-data.service';
import { Observable } from 'rxjs';
import { SelectDropdownService } from '@shared/services/select-dropdown.service';
import { FormDataService } from '@core/services/dashboard/property-data/form-data.service';


@Component({
  selector: 'app-new',
  standalone: true,
  imports: [SelectDropdownComponent, AsyncPipe, InputFieldComponent],
  templateUrl: './new.component.html',
  animations: [routeFadeInOut, visibleTrigger],
  host: {
    '[@routeFadeInOut]': 'true',
    '[style.display]': 'contents',
  },
})
export class NewComponent {
  externalListingFormGroup!: FormGroup;
  options$: Record<string, Observable<IdAndNameType[]> | null> = {}
  isFetching: Record<string, boolean> = {}
  onChange!: (field: string, id: number, fetchMethod: (id: number) => Observable<IdAndNameType[]>, resetFields?: string[]) => void

  constructor(
    private fb: FormBuilder,
    private initialDataService: InitialDataService,
    private formDataService: FormDataService,
    private sds: SelectDropdownService
  ) {
    this.externalListingFormGroup = this.fb.group({
      state: ['', [Validators.required]],
      region: ['', [Validators.required]],
      location: ['', [Validators.required]],
      section: ['', [Validators.required]],
      lga: ['', [Validators.required]],
      lcda: ['', [Validators.required]],
      streetName: ['', [Validators.required]],
      streetNumber: [''],
      development: [''],
      sector: ['', [Validators.required]],
      subSector: ['', [Validators.required]],
      subType: [''],
      offer: ['', [Validators.required]],
      noOfBeds: [],
      size: [],
      landArea: [],
      
      salePrice: [],
      leasePrice: [],
      pricePerSqm: [],
      serviceCharge: [],
    });
  }

  ngOnInit(): void {

    this.options$['state'] = this.initialDataService.getAllStates();
    this.options$['sector'] = this.initialDataService.getAllSectors();
    this.options$['offer'] = this.initialDataService.getAllOffers();
    this.onChange = this.sds.onInitChangeBuilder(this.externalListingFormGroup, this.options$, this.isFetching)
  }

  onStateChange(stateId: number) {
    if (stateId) {
      this.onChange('region', stateId, (id) => this.formDataService.getRegionsByStateId(id), ['region', 'location', 'section', 'lga'])
    }
  }

  onRegionChange(regionId: number) {
    if (regionId) {
      this.onChange("location", regionId, (id) => this.formDataService.getLocationsByRegionId(id), ['location', 'section', 'lga'])
      this.onChange("lga", regionId, (regionId) => this.formDataService.getLgasByRegionId(regionId))
    }
  }

  onLocationChange(locationId: number) {
    if (locationId) {
      this.onChange("section", locationId, (id) => this.formDataService.getSectionsByLocationId(id), ['section'])
    }
  }

  onSectionChange(sectionId: number) {
    //
  }

  onLgaChange(lgaId: number) {
    if (lgaId) {
      this.onChange("lcda", lgaId, (id) => this.formDataService.getLcdasByLgaId(id), ['lcda'])
    }
  }

  onSectorChange(sectorId: number) {
    if (sectorId) {
      this.onChange('subSector', sectorId, (id) => this.formDataService.getSubSectorsBySectorId(id))
    }
  }
}
