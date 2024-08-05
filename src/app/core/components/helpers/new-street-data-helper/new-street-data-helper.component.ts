import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmModalComponent } from '@core/components/dashboard/modals/confirm-modal/confirm-modal.component';
import { GeolocationAlertModalComponent } from '@core/components/dashboard/modals/geo-location-alert-modal/geo-location-alert-modal.component';
import { StreetDataFormComponent } from '@core/components/dashboard/street-data-form/street-data-form.component';
import { GeolocationService, PERMISSION_DENIED } from '@core/services/dashboard/geolocation.service';
import { StreetDataService } from '@core/services/dashboard/street-data.service';
import { AlertService } from '@shared/services/alert.service';
import { FormSubmissionService } from '@shared/services/form-submission.service';
import { LoaderService } from '@shared/services/loader.service';
import { ModalService } from '@shared/services/modal.service';
import { UtilsService } from '@shared/services/utils.service';

@Component({
  template: ``,
})
export class NewStreetDataHelperComponent {
  activePane: 'new-entry' | 'existing-entry' = 'new-entry';
  paneTabs = [
    { pane: 'new-entry', tabLabel: 'New Entry' },
    { pane: 'existing-entry', tabLabel: 'Existing Entry' },
  ];
  streetDataFormGroup!: FormGroup;
  resettingForm = false;

  @ViewChild(StreetDataFormComponent) streetDatForm!: StreetDataFormComponent;

  constructor(
    public utils: UtilsService,
    private geoService: GeolocationService,
    private modalService: ModalService,
    private formSubmit: FormSubmissionService,
    private loader: LoaderService,
    private alertService: AlertService,
    private geo: GeolocationService,
    private streetDataService: StreetDataService,
    private router: Router
  ) {}

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

          if (!this.utils.isVPNActive()) {
            try {
              googleMapsUrl = await this.geo.getGoogleMapsUrl();
            } catch (error) {
              googleMapsUrl = null;
              console.error(error);
            }
            body.geolocation = googleMapsUrl;
          }
          this.streetDataService.store(body).subscribe({
            next: (streetData) => {
              this.alertService.success(
                'Success',
                'Street Data successfully saved.'
              );
              if (creationType === 'createAnother') {
                this.resetForm();
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

  fetchStreetData(searchedStreetData: SearchedStreetDataType) {
    console.log(searchedStreetData);
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

  private resetForm() {
    this.resettingForm = true;
    setTimeout(() => {
      this.streetDataFormGroup.reset();
      this.resettingForm = false;
    }, 1000);
  }
}
