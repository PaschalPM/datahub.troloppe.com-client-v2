import { Component, ViewChild } from '@angular/core';
import { GeolocationAlertModalComponent } from '@core/components/dashboard/modals/geo-location-alert-modal/geo-location-alert-modal.component';
import {
  GeolocationService,
  PERMISSION_DENIED,
} from '@core/services/dashboard/geolocation.service';
import { routeFadeInOut, visibleTrigger } from '@shared/animations';
import { ModalService } from '@shared/services/modal.service';
import { UtilsService } from '@shared/services/utils.service';
import { BackBtnComponent } from '@shared/components/back-btn/back-btn.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PaneNavigatorPanelComponent } from '@core/components/dashboard/pane-navigator-panel/pane-navigator-panel.component';
import { CommonModule } from '@angular/common';
import { NewStreetDataSearchSectionComponent } from '@core/components/dashboard/new-street-data-search-section/new-street-data-search-section.component';
import { StreetDataFormComponent } from '@core/components/dashboard/street-data-form/street-data-form.component';
import { FormSubmissionService } from '@shared/services/form-submission.service';
import { ConfirmModalComponent } from '@core/components/dashboard/modals/confirm-modal/confirm-modal.component';
import { LoaderService } from '@shared/services/loader.service';
import { AlertService } from '@shared/services/alert.service';
import { StreetDataService } from '@core/services/dashboard/street-data.service';
import { Router } from '@angular/router';
import { SpinnerComponent } from '@shared/components/spinner/spinner.component';
import { ExistingCreateStreetDataComponent } from "../../partials/existing-create-street-data/existing-create-street-data.component";

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [
    BackBtnComponent,
    ReactiveFormsModule,
    PaneNavigatorPanelComponent,
    CommonModule,
    NewStreetDataSearchSectionComponent,
    StreetDataFormComponent,
    SpinnerComponent,
    ExistingCreateStreetDataComponent
],
  templateUrl: './new.component.html',
  animations: [routeFadeInOut, visibleTrigger],
  host: {
    '[@routeFadeInOut]': 'true',
    '[style.display]': 'contents',
  },
})
export class NewComponent {
  activePane: 'new-entry' | 'existing-entry' = 'existing-entry';
  paneTabs = [
    { pane: 'new-entry', tabLabel: 'New Entry' },
    { pane: 'existing-entry', tabLabel: 'Existing Entry' },
  ];
  streetDataFormGroup!: FormGroup;
  resettingForm = false

  @ViewChild(StreetDataFormComponent) streetDatForm!: StreetDataFormComponent;

  constructor(
    public utils: UtilsService,
    private geoService: GeolocationService,
    private modalService: ModalService,
    private fb: FormBuilder,
    private formSubmit: FormSubmissionService,
    private loader: LoaderService,
    private alertService: AlertService,
    private geo: GeolocationService,
    private streetDataService: StreetDataService,
    private router: Router
  ) {
    // -----> Form Group
    this.streetDataFormGroup = this.fb.group(
      {
        unique_code: [{ value: null, disabled: true }],
        street_address: [null, [Validators.required]],
        description: [null, [Validators.required]], // *
        sector: [null, [Validators.required]],
        sub_sector: [null, [Validators.required]],
        location: [{ value: null, disabled: true }, [Validators.required]],
        section: [null, [Validators.required]],
        number_of_units: [null, [Validators.required, Validators.max(1000)]], // *
        contact_name: [null],
        contact_numbers: [null],
        contact_email: [null, [Validators.email]],
        construction_status: [null, [Validators.required]],
        development_name: [null],
        image: [null, [Validators.required]],

        geolocation: [null],
      },
      { updateOn: 'submit' }
    );
  }

  ngOnInit(): void {
    this.geolocationPrompts();
  }

  onCreateStreetData(event: SubmitEvent) {
    this.formSubmit.onFormSubmission();
    if (this.streetDataFormGroup.valid) {
      const creationType: CreationType = event.submitter?.id as CreationType;

      this.modalService.open(ConfirmModalComponent, {
        matIconName: 'description',
        title: 'Confirm Data Submission',
        message: 'Proceed if you are sure this form was correctly filled.',
        severity: 'warning',
        ok: async () => {
          this.loader.start();
          const body = this.formatedDataForSubmission();

          let googleMapsUrl;

          // if (!this.utils.isVPNActive()) {
          //   try {
          //     googleMapsUrl = await this.geo.getGoogleMapsUrl();
          //   } catch (error) {
          //     googleMapsUrl = null;
          //     console.error(error);
          //   }
          //   body.geolocation = googleMapsUrl;
          // }
          this.streetDataService.store(body).subscribe({
            next: (streetData) => {
              this.alertService.success(
                'Success',
                'Street Data successfully saved.'
              );
              if (creationType === 'createAnother') {
                this.resetForm()
              } else {
                this.router.navigateByUrl(
                  `/dashboard/street-data/${streetData.id}`
                );
              }
            },
          });
        },
      });
    } else {
      this.alertService.error(
        'Form Error',
        'Check that all fields are correctly filled.'
      );
    }
  }

  private geolocationPrompts() {
    window.navigator.permissions
      .query({ name: 'geolocation' })
      .then((value) => {
        // Check if client has VPN on
        if (this.utils.isVPNActive()) {
          window.alert(
            'Please ensure you turn off your VPN service before you process.'
          );
        }

        // Location Prompt
        if (value.state !== 'granted' && value.state === 'prompt') {
          window.confirm(
            'You will be prompted to share your location. Kindly allow this request.'
          );
        }

        // -----> Enable Geolocation Prompt
        this.geoService.errorEvents$.subscribe((error) => {
          if (error === PERMISSION_DENIED) {
            setTimeout(() => {
              this.modalService.open(GeolocationAlertModalComponent);
            }, 1000);
          }
        });
        this.geoService.observe();
      });
  }

  private formatedDataForSubmission(): any {
    const body = { ...this.streetDataFormGroup.value };

    // set Sector ID
    body.sector_id = body.sector;

    // set Sub Sector ID
    body.sub_sector_id = body.sub_sector;

    // set Location ID
    body.location_id = this.streetDatForm.fixedLocationId;

    // set Section ID
    body.section_id = body.section;

    // set Image Path
    body.image_path = body.image;

    return body;
  }

  private resetForm(){
    this.resettingForm = true
    setTimeout(() => {
      this.streetDataFormGroup.reset()
      this.resettingForm = false
    }, 1000)
  }
}
