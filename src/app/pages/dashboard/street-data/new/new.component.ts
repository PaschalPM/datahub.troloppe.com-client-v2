import { Component } from '@angular/core';
import { routeFadeInOut, visibleTrigger } from '@shared/animations';
import {
  ReactiveFormsModule,
} from '@angular/forms';
import { PaneNavigatorPanelComponent } from '@core/components/dashboard/pane-navigator-panel/pane-navigator-panel.component';
import { CommonModule } from '@angular/common';
import { StreetDataFormComponent } from '@core/components/dashboard/street-data-form/street-data-form.component';
import { SpinnerComponent } from '@shared/components/spinner/spinner.component';
import { ExistingCreateStreetDataComponent } from '../../partials/existing-create-street-data/existing-create-street-data.component';
import { NewStreetDataHelperComponent } from '@core/components/helpers/new-street-data-helper/new-street-data-helper.component';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PaneNavigatorPanelComponent,
    CommonModule,
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
export class NewComponent extends NewStreetDataHelperComponent { }
