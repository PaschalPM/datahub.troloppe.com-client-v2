import { Injectable, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../modal.service';
import { AlertService } from '@shared/services/alert.service';
import { ExternalListingsService } from '../external-listings.service';
import { IndexService } from './index.service';
import { FormSubmissionService } from '@shared/services/form-submission.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { UtilsService } from '@shared/services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class ResourceCreationFormModalService implements OnDestroy {

  private resourceCreated$ = new Subject<{ name: string, data: IdAndNameType }>();
  private destroy$ = new Subject<void>();

  // Mapping dependencies where selections in one field affect another
  private dependentSelectionMap: Record<string, string[]> = {
    region: ['state'],
    location: ['state', 'region'],
    section: ['state', 'region', 'location'],
    lga: ['state', 'region'],
    lcda: ['state', 'region', 'lga'],
    subSector: ['sector']
  };

  // Forms that do not have default selections
  private formWithoutDefaultSelections = ['state', 'developer', 'listingAgent', 'listingSource'];

  // Forms requiring additional fields
  private formsWithAdditionalFields = ['developer', 'listingAgent'];

  // Mapping resource creation actions to API calls
  private resourceCreationMapper: Record<string, (data: any) => Observable<{ message: string, data: any }>> = {
    state: (data) => this.indexPropertyDataService.createResource('state', data),
    region: (data) => this.indexPropertyDataService.createResource('region', data),
    location: (data) => this.indexPropertyDataService.createResource('location', data),
    section: (data) => this.indexPropertyDataService.createResource('section', data),
    lga: (data) => this.indexPropertyDataService.createResource('lga', data),
    lcda: (data) => this.indexPropertyDataService.createResource('lcda', data),
    subSector: (data) => this.indexPropertyDataService.createResource('subSector', data),
  };

  constructor(
    private readonly modalService: ModalService,
    private readonly alertService: AlertService,
    private readonly externalListingsService: ExternalListingsService,
    private readonly formSubmissionService: FormSubmissionService,
    private readonly indexPropertyDataService: IndexService,
    private readonly utils: UtilsService,
  ) { }

  /**
   * Subscribe to resource creation events.
   */
  onResourceChanged(cb: (eventData: { name: string, data: IdAndNameType }) => void) {
    this.resourceCreated$.pipe(takeUntil(this.destroy$)).subscribe(eventData => {
      cb(eventData);
    });
  }

  /**
   * Handles adding a new resource.
   */
  addResource(innerFormGroup: FormGroup, name: string) {
    this.formSubmissionService.onFormSubmission(innerFormGroup);

    if (innerFormGroup.valid) {
      if (confirm("Are you sure you want to add this resource to the database?")) {
        const data = innerFormGroup.getRawValue();

        // Format data based on selection presence
        if (!this.formWithoutDefaultSelections.includes(name)) {
          for (const key in data) {
            if (key === name) {
              data['name'] = data[name];
            } else {
              data[key + '_id'] = data[key];
            }
          }
        }

        // Call API to create resource
        this.resourceCreationMapper[name](data)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (v) => {
              this.alertService.success("Resource Added", v.message);
              this.resourceCreated$.next({ name, data: v.data[name] });
              this.modalService.close();
            },
            error: (e) => {
              console.error(e);
              this.alertService.error("Error occurred", e.error.message);
            }
          });
      }
    }
  }

  /**
   * Returns a formatted label for a form field.
   */
  getLabel(formControlName: string): string {
    const labelMap: Record<string, string> = {
      lga: 'L. G. A',
      lcda: 'L. C. D. A'
    };
    return labelMap[formControlName] || this.utils.capitalize(formControlName);
  }

  /**
   * Prepares the form state by adding necessary controls.
   */
  prepareFormState(
    outerFormGroup: FormGroup,
    innerFormGroup: FormGroup,
    formControlName: string,
    preSelectedOptions: { itemName: string, items: IdAndNameType[], label: string }[] = [],
    inputFields: { label: string, name: string }[] = []
  ) {

    inputFields.push({ label: 'Name', name: 'name' })

    if (this.formWithoutDefaultSelections.includes(formControlName)) {

      // Add additional fields if necessary
      if (this.formsWithAdditionalFields.includes(formControlName)) {
        inputFields.push(
          { label: 'Address', name: 'address' },
          { label: 'Phone Numbers', name: 'phone_numbers' },
          { label: 'Email', name: 'email' },
          { label: 'Website', name: 'website' },
        )
      }

      inputFields.forEach(field => {
        if (field.name === 'name') {
          innerFormGroup.addControl('name', new FormControl('', [Validators.required]));
        }
        else {
          innerFormGroup.addControl(field.name, new FormControl(''))
        }
      })

    } else {
      // Get dependent selections related to the current form control
      const initialSelectedNames = this.dependentSelectionMap[formControlName];

      // Add dependent selections as disabled controls
      initialSelectedNames?.forEach((itemName) => {
        const value = outerFormGroup.get(itemName)?.value;
        innerFormGroup.addControl(itemName, new FormControl({ value, disabled: true }));

        // Retrieve and store preselected options
        const selectedData = this.externalListingsService.dropdownSelectedData[itemName];
        if (selectedData) {
          preSelectedOptions.push({
            itemName,
            items: [{ id: selectedData.id, name: selectedData.name }],
            label: this.getLabel(itemName)
          });
        }
      });

      // Add main control field for new resource creation
      innerFormGroup.addControl(formControlName, new FormControl('', Validators.required));
    }
  }

  /**
   * Cleanup on component/service destruction.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
