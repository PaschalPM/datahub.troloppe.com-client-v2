import { Component, Input } from '@angular/core';
import { InputFieldComponent } from '@shared/components/input-field/input-field.component';
import { ImageUploaderComponent } from '../image-uploader/image-uploader.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UtilsService } from '@shared/services/utils.service';
import { NgIf } from '@angular/common';
import { FormSubmitBtnComponent } from '@shared/components/form-submit-btn/form-submit-btn.component';
import { MyMatIconComponent } from '@shared/components/my-mat-icon/my-mat-icon.component';
import { SelectDropdownComponent } from '@shared/components/select-dropdown/select-dropdown.component';
import { FormFieldDataService } from '@core/services/dashboard/form-field-data.service';
import { constructionStatusOptions } from 'app/fixtures/street-data';

@Component({
  selector: 'street-data-form',
  standalone: true,
  imports: [
    InputFieldComponent,
    ImageUploaderComponent,
    ReactiveFormsModule,
    NgIf,
    FormSubmitBtnComponent,
    MyMatIconComponent,
    SelectDropdownComponent
  ],
  templateUrl: './street-data-form.component.html',
  styles: `
    :host{
      display: contents
    }
  `
})
export class StreetDataFormComponent {
  @Input({ required: true }) streetDataFormGroup!: FormGroup;
  @Input({ required: true }) type!: 'view' | 'edit' | 'new-create' | 'existing-create'
  @Input() onSubmit!: () => void;
  
  @Input() geolocation= ''
  @Input() creator= ''
  @Input() createdAt= ''
  @Input() isPermitted = false;
  
  constructionStatusOptions: OptionType[] = constructionStatusOptions;
  formIsSubmitting = false;
  subSectorPending = false;
  uniqueCodeDataList!: Array<string>;
  sectionOptions: IdAndNameType[] = [];
  sectorOptions: IdAndNameType[] = [];
  subSectorOptions: IdAndNameType[] = [];
  subSectorLabel = ''
  isImageLoading = false;

  private formFieldData!: StreetDataFormFieldDataInterface;
  private fixedLocationId!: number;

  constructor(
    public utils: UtilsService,
    private streetDataFormFieldService: FormFieldDataService
  ) {}

  ngOnInit(): void {
    this.getUniqueCodeDataList();
    this.getFormFieldDataAndSetsOptionsValueFromAPI();
  }
  

  onSectionChange(sectionId: number) {
    this.streetDataFormGroup.controls['section_id']?.setValue(sectionId);
    this.streetDataFormGroup.controls['section']?.setValue(sectionId);

  }

  onSectorChange(sectorId: number) {
    this.subSectorPending = true;
    this.streetDataFormGroup.get('sector')?.setValue(sectorId);
    this.streetDataFormGroup.get('sector_id')?.setValue(sectorId);
    this.streetDataFormGroup.get('sub_sector')?.setValue(null);
    this.setSubSectorOptions(sectorId);
  }

  onSubSectorChange(subSectorId: number) {
    this.streetDataFormGroup.get('sub_sector')?.setValue(subSectorId);
    this.streetDataFormGroup.get('sub_sector_id')?.setValue(subSectorId);
  }

  private getFormFieldDataAndSetsOptionsValueFromAPI() {
    this.streetDataFormFieldService
      .getFormFieldData()
      .subscribe((formFieldData) => {
        if (formFieldData) {
          this.formFieldData = formFieldData;
          // Set fixed location ID
          this.fixedLocationId =
            this.streetDataFormGroup.get('location_id')?.value;

          this.setSectionOptions();
          this.setSectorOptions();

          // Set selected sector ID
          const selectedSectorId =
            this.streetDataFormGroup.get('sector_id')?.value;

          this.setSubSectorOptions(selectedSectorId);
        }
      });
  }

  private getUniqueCodeDataList() {
    this.streetDataFormFieldService
      .getFormFieldData()
      .subscribe((formFieldData) => {
        if (formFieldData) {
          this.uniqueCodeDataList = formFieldData.unique_codes.map(
            (uniqueCode) => uniqueCode.value
          );
        }
      });
  }
  
  private setSectionOptions() {
    const fixedLocation = this.formFieldData.locations.find(
      (location) => location.id === this.fixedLocationId
    );
    if (fixedLocation) {
      this.sectionOptions = fixedLocation.sections;
    }
  }

  private setSectorOptions() {
    this.sectorOptions = this.formFieldData.sectors.map((sector) => ({
      ...sector,
      name: this.utils.capitalize(sector.name),
    }));
  }

  private setSubSectorOptions(sectorId: number) {
    const selectedSector = this.formFieldData.sectors.find(
      (sector) => sector.id === +sectorId
    );
    if (selectedSector) {
      this.subSectorOptions = selectedSector.sub_sectors;
      console.log(this.subSectorOptions)
      this.subSectorLabel =
        this.utils.capitalize(selectedSector.name) + ' Sub Sector';
      setTimeout(() => {
        this.subSectorPending = false;
      }, 1000);
    }
  }
}
