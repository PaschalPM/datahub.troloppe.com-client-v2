import { Injectable, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  private resourceCreated$ = new Subject<{ name: string, data: IdAndNameType }>()
  private destroy$ = new Subject<void>()

  private resourceCreationMapper: Record<string, (data: any) => Observable<{ message: string, data: any }>> = {
    state: (data) => this.indexPropertyDataService.createState(data)
  }

  constructor(
    private readonly modalService: ModalService,
    private readonly alertService: AlertService,
    private readonly externalListingsService: ExternalListingsService,
    private readonly formSubmissionService: FormSubmissionService,
    private readonly indexPropertyDataService: IndexService,
    private readonly utils: UtilsService,
  ) {
  }

  onResourceChanged(cb: (eventData: { name: string, data: IdAndNameType }) => void) {
    this.resourceCreated$.pipe(takeUntil(this.destroy$)).subscribe(eventData => {
      cb(eventData)
    })
  }
  addResource(innerFormGroup: FormGroup, name: string) {
    this.formSubmissionService.onFormSubmission(innerFormGroup)
    if (innerFormGroup.valid) {

      if (confirm("Are you sure you want to add this resource to the database?")) {
        const data = innerFormGroup.value
        this.resourceCreationMapper[name](data)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (v) => {
              this.alertService.success("Resource Added", v.message)
              this.resourceCreated$.next({ name, data: v.data.state })
              this.modalService.close()
            },
            error: (e) => {
              console.error(e)
              this.alertService.error("Error occured", e.error.message)
            }
          })
      }

    }
  }

  getLabel(formControlName: string): string {
    const labelMap: Record<string, string> = {
      lga: 'L. G. A',
      lcda: 'L. C. D. A'
    };
    return labelMap[formControlName] || this.utils.capitalize(formControlName);
  }

  syncInitialSelections(
    outerFormGroup: FormGroup,
    innerFormGroup: FormGroup,
    formControlName: string,
    dependentSelectionMap: Record<string, string[]>,
    preSelectedOptions: { itemName: string, items: IdAndNameType[], label: string }[] = []
  ) {

    // Get dependent selections related to current formcontrol
    const initialSelectedNames = dependentSelectionMap[formControlName]

    // Iterate through each provided field name if available
    initialSelectedNames?.forEach((itemName) => {

      // Add the form control and disable to field
      const value = outerFormGroup.get(itemName)?.value;
      innerFormGroup.addControl(itemName, new FormControl({ value, disabled: true }))

      // Retrieve and push the preselected data (id and name) for this field
      const selectedData = this.externalListingsService.dropdownSelectedData[itemName];
      if (selectedData) {
        preSelectedOptions.push({
          itemName,
          items: [{ id: selectedData.id, name: selectedData.name }],
          label: this.getLabel(itemName)
        });
      }
    });

    // Add control for resource to be ctreated in the main form field being managed
    innerFormGroup.addControl(formControlName, new FormControl('', Validators.required))
  };

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
