import { Component } from '@angular/core';
import { routeFadeInOut, visibleTrigger } from '@shared/animations';
import { ExternalListingFormComponent } from "../../../../core/components/dashboard/external-listing-form/external-listing-form.component";


@Component({
  selector: 'app-new',
  standalone: true,
  imports: [ExternalListingFormComponent],
  template: `<app-external-listing-form></app-external-listing-form>`,
  animations: [routeFadeInOut, visibleTrigger],
  host: {
    '[@routeFadeInOut]': 'true',
    '[style.display]': 'contents',
  },
})
export class NewComponent {

}
