import { Component } from '@angular/core';
import { DownloadExportComponent } from './download-export/download-export.component';
import { TextButtonComponent } from './text-btn/text-btn.component';
import { RouterService } from '@core/services/router.service';

@Component({
  selector: 'app-create-and-download-external-listings-btns',
  standalone: true,
  imports: [DownloadExportComponent, TextButtonComponent],
  template: `

<div class="flex items-center">
      <app-download-export
        title="External Listings"
        [downloadLink]="externalListingsExportLink"
        fileName="external-listings"
      />

      <text-button withIcon="add" [isFlexed]="true" (clickEvent)="goToNewListingView()" text="New Listing">
      </text-button>
    </div>
  
  `,
  styles: ``
})
export class CreateAndDownloadExternalListingsBtnsComponent {
  externalListingsExportLink = '/external-listings/export';

  constructor(
      private router: RouterService,
    ) { }

  goToNewListingView() {
    this.router.navigateByUrl('/dashboard/external-listings/new');
  }
}
