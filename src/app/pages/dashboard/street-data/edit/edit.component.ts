import { Location, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextButtonComponent } from '@core/components/dashboard/text-btn/text-btn.component';
import { InputFieldComponent } from '@shared/components/input-field/input-field.component';
import { ImageUploaderComponent } from '@core/components/dashboard/image-uploader/image-uploader.component';
import { ConfirmModalComponent } from '@core/components/dashboard/modals/confirm-modal/confirm-modal.component';
import { ModalService } from '@shared/services/modal.service';
import { StreetDataDetails } from '@core/classes/street-data-details';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';
import { constructionStatusOptions } from 'app/fixtures/street-data';
import { FormSubmitBtnComponent } from '@shared/components/form-submit-btn/form-submit-btn.component';
import { MyMatIconComponent } from '@shared/components/my-mat-icon/my-mat-icon.component';
import { AlertService } from '@shared/services/alert.service';
import { BackBtnComponent } from '@shared/components/back-btn/back-btn.component';
import { FormFieldDataService } from '@core/services/dashboard/form-field-data.service';
import { SelectDropdownComponent } from '@shared/components/select-dropdown/select-dropdown.component';
import { visibleTrigger } from '@shared/animations';
import { FormSubmissionService } from '@shared/services/form-submission.service';
import { StreetDataFormComponent } from '@core/components/dashboard/street-data-form/street-data-form.component';

@Component({
  selector: 'app-edit-street-data',
  standalone: true,
  imports: [
    TextButtonComponent,
    NotFoundComponent,
    ReactiveFormsModule,
    NgIf,
    ImageUploaderComponent,
    InputFieldComponent,
    FormSubmitBtnComponent,
    MyMatIconComponent,
    BackBtnComponent,
    SelectDropdownComponent,
    StreetDataFormComponent
  ],
  templateUrl: './edit.component.html',
  animations: [visibleTrigger]
})
export class EditComponent extends StreetDataDetails {
  confirmDeleteModalPropsData: ConfirmModalPropsType = {
    matIconName: 'delete',
    title: 'Confirm Delete',
    message: 'Are you sure you want to delete this street data record?',
    ok: () => {
      this.loader.start();
      this.streetDataService.delete(this.streetData.id as number).subscribe({
        next: () => {
          this.alert.success('Success','Street Data deleted successfully.');
          this.loader.stop();
        },
        error: (error) => {
          this.alert.error('Error', error.message);
          this.loader.stop();
        },
      });
    },
  };

  confirmEditModalPropsData: ConfirmModalPropsType = {
    matIconName: 'edit',
    title: 'Confirm Edit',
    message: 'Are you sure you want to edit this street data record?',
    ok: () => {
      const data = { ...this.streetDataFormGroup.value };
      data['image_path'] = this.streetDataFormGroup.get('image_path')?.value;
      this.loader.start();
      this.streetDataService.edit(data, data.id).subscribe({
        next: () => {
          this.alert.success('Success', 'Street Data updated successfully.');
          this.loader.stop();
          this.location.back()
        },
        error: (error) => {
          console.log(error);
          this.alert.error('Error', error.message);
          this.loader.stop();
        },
      });
    },
  };

  uniqueCodeDataList!: Array<string>;
  formIsSubmitting = false;
  locationOptions: IdAndNameType[] = [];
  sectionOptions: IdAndNameType[] = [];
  sectorOptions: IdAndNameType[] = [];
  subSectorOptions: IdAndNameType[] = [];
  constructionStatusOptions: OptionType[] = constructionStatusOptions;
  isImageLoading = false;

  subSectorPending = false
  subSectorLabel = ''

  private formFieldData!: StreetDataFormFieldDataInterface;
  private fixedLocationId!: number;

  constructor(
    private modalService: ModalService,
    private fb: FormBuilder,
    private streetDataFormFieldService: FormFieldDataService,
    private alert: AlertService,
    private location: Location,
    private formSubmit: FormSubmissionService
  ) {
    super();
    this.streetDataFormGroup = this.fb.group(
      {
        id: [''],
        image_path: [
          {
            value: '',
            disabled: true,
          },
          [Validators.required],
        ],
        unique_code: ['', [Validators.required]],
        street_address: ['', [Validators.required]],
        development_name: [''],
        location: [{ value: '', disabled: true }, [Validators.required]],
        location_id: [{ value: 0 }],
        sector: ['', [Validators.required]],
        sector_id: [{ value: 0 }],
        sub_sector: ['', [Validators.required]],
        sub_sector_id: [{ value: 0 }],
        description: ['', [Validators.required]], // *
        section: ['', [Validators.required]],
        section_id: [null, [Validators.required]],

        number_of_units: [null, [Validators.required, Validators.max(1000)]], // *
        contact_name: [''],
        contact_numbers: [''],
        contact_email: ['', [Validators.email]],
        construction_status: ['', [Validators.required]],
        is_verified: [false],
        geolocation: [''],
        creator: [''],
        created_at: [''],
      },
      { updateOn: 'submit' }
    );
  }

  ngOnInit(): void {
    this.setStreetDataId();
    this.setFormDataAndSomeProperties(true);
    this.getUniqueCodeDataList();
    this.checkDataIsLoaded();
    this.getFormFieldDataAndSetsOptionsValueFromAPI();
    this.setPermission()
  }


  onSectorChange(sectorId: number) {
    this.subSectorPending = true
    this.streetDataFormGroup.get('sector')?.setValue(sectorId);
    this.streetDataFormGroup.get('sector_id')?.setValue(sectorId);
    this.streetDataFormGroup.get('sub_sector')?.setValue(null);
    this.setSubSectorOptions(sectorId);
  }

  onSubSectorChange(subSectorId: number) {
    this.streetDataFormGroup.get('sub_sector')?.setValue(subSectorId);
    this.streetDataFormGroup.get('sub_sector_id')?.setValue(subSectorId);
  }

  onSectionChange(sectionId: number) {
    this.streetDataFormGroup.controls['section_id']?.setValue(sectionId);
    this.streetDataFormGroup.controls['section']?.setValue(sectionId);

  }

  onDeleteStreetData() {
    this.modalService.open(
      ConfirmModalComponent,
      this.confirmDeleteModalPropsData
    );
  }

  getUniqueCodeDataList() {
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

  onEditStreetData() {
    console.log(' WORK')
    this.formSubmit.onFormSubmission()
    if (this.streetDataFormGroup.valid) {
      this.modalService.open(
        ConfirmModalComponent,
        this.confirmEditModalPropsData
      );
    } else {
      this.alert.error(
        'Form Error','Check that all fields are correctly filled.'
      );
    }
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
      this.subSectorLabel = this.utils.capitalize(selectedSector.name) + ' Sub Sector'
      setTimeout(() => {
        this.subSectorPending = false
      }, 1000);
    }
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
}
