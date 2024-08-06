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
import { ExistingCreateStreetDataComponent } from '../../partials/existing-create-street-data/existing-create-street-data.component';
import { NewStreetDataHelperComponent } from '@core/components/helpers/new-street-data-helper/new-street-data-helper.component';

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
    ExistingCreateStreetDataComponent,
  ],
  templateUrl: './new.component.html',
  animations: [routeFadeInOut, visibleTrigger],
  host: {
    '[@routeFadeInOut]': 'true',
    '[style.display]': 'contents',
  },
})
export class NewComponent extends NewStreetDataHelperComponent {}
