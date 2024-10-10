import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BackBtnComponent } from '@shared/components/back-btn/back-btn.component';
import { TextButtonComponent } from '@core/components/dashboard/text-btn/text-btn.component';
import { StreetDataDetails } from '@core/classes/street-data-details';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';
import { routeFadeInOut, visibleTrigger } from '@shared/animations';
import { StreetDataFormComponent } from '@core/components/dashboard/street-data-form/street-data-form.component';

@Component({
  selector: 'app-view-street-data',
  standalone: true,
  imports: [
    TextButtonComponent,
    NotFoundComponent,
    BackBtnComponent,
    StreetDataFormComponent
  ],
  templateUrl: './view.component.html',
  animations: [visibleTrigger, routeFadeInOut],
  host: {
    '[@routeFadeInOut]': 'true',
    '[style.display]': 'contents',
  },
})
export class ViewComponent extends StreetDataDetails {
  constructor(private fb: FormBuilder, private router: Router) {
    super();
    this.streetDataFormGroup = this.fb.group(
      {
        id: [''],
        image_path: [
          {
            value: '',
            disabled: true,
          },
        ],
        unique_code: [
          {
            value: '',
            disabled: true,
          },
        ],
        street_address: [
          {
            value: '',
            disabled: true,
          },
        ],
        development_name: [
          {
            value: '',
            disabled: true,
          },
        ],
        location: [
          {
            value: '',
            disabled: true,
          },
        ],
        location_id: [{ value: 0, disabled: true }],
        section: [{ value: '', disabled: true }],
        section_id: [{ value: 0, disabled: true }],
        sector: [
          {
            value: '',
            disabled: true,
          },
        ],
        sector_id: [
          {
            value: 0,
            disabled: true,
          },
        ],
        sub_sector: [{ value: '', disabled: true }],
        sub_sector_id: [{ value: 0, disabled: true }],
        number_of_units: [{ value: '', disabled: true }], // *
        size: [{ value: '', disabled: true }], // *
        contact_name: [{ value: '', disabled: true }],
        contact_numbers: [{ value: '', disabled: true }],
        contact_email: [{ value: '', disabled: true }],
        construction_status: [{ value: '', disabled: true }],
        is_verified: [{ value: true, disabled: true }],
        description: [{ value: '', disabled: true }],
        geolocation: [{ value: '', disabled: true }],
        creator: [{ value: '', disabled: true }],
        created_at: [{ value: '', disabled: true }],
      },
      { updateOn: 'submit' }
    );
  }

  ngOnInit(): void {
    this.setStreetDataId();
    this.initFormDataAndSomeProperties();
    this.setPermission();
    this.checkDataIsLoaded();
  }

  goBack() {
    this.router.navigateByUrl('/dashboard/street-data');
  }

  routeToEditStreetView() {
    this.router.navigateByUrl(
      `/dashboard/street-data/edit/${this.streetDataId}`
    );
  }
}
