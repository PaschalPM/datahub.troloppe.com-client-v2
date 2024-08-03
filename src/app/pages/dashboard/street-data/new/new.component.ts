import { Component } from '@angular/core';
import { GeolocationAlertModalComponent } from '@core/components/dashboard/modals/geo-location-alert-modal/geo-location-alert-modal.component';
import {
  GeolocationService,
  PERMISSION_DENIED,
} from '@core/services/dashboard/geolocation.service';
import { routeFadeInOut } from '@shared/animations';
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

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [
    BackBtnComponent,
    ReactiveFormsModule,
    PaneNavigatorPanelComponent,
    CommonModule,
    NewStreetDataSearchSectionComponent,
  ],
  templateUrl: './new.component.html',
  animations: [routeFadeInOut],
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

  constructor(
    public utils: UtilsService,
    private geoService: GeolocationService,
    private modalService: ModalService,
    private fb: FormBuilder
  ) {
    // -----> Form Group
    this.streetDataFormGroup = this.fb.group(
      {
        unique_code: ['', [Validators.required]],
        street_address: ['', [Validators.required]],
        description: ['', [Validators.required]], // *
        sector: [null, [Validators.required]],
        sub_sector: [null, [Validators.required]],
        location: [{ value: null, disabled: true }, [Validators.required]],
        section: ['', [Validators.required]],
        number_of_units: [null, [Validators.required, Validators.max(1000)]], // *
        contact_name: [''],
        contact_numbers: [''],
        contact_email: ['', [Validators.email]],
        construction_status: ['', [Validators.required]],
        image: ['', [Validators.required]],

        geolocation: [''],
        submit: [''],
      },
      { updateOn: 'submit' }
    );
  }

  ngOnInit(): void {
    this.geolocationPrompts();
  }

  onCreate() {}

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
}
