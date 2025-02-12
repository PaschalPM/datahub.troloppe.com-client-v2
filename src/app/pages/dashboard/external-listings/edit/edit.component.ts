import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExternalListingFormComponent } from '@core/components/dashboard/external-listing-form/external-listing-form.component';
import { ExternalListingsService } from '@core/services/dashboard/external-listings.service';
import { routeFadeInOut, visibleTrigger } from '@shared/animations';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ExternalListingFormComponent, AsyncPipe],
  template: `
  <app-external-listing-form action="edit" [data]="externalListings$ | async "></app-external-listing-form>
  `,
  animations: [routeFadeInOut, visibleTrigger],
  host: {
    '[@routeFadeInOut]': 'true',
    '[style.display]': 'contents',
  },
})
export class EditComponent implements OnInit {
  externalListings$!: Observable<any>

  constructor(
    private readonly externalListingService: ExternalListingsService,
    private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.externalListings$ = this.externalListingService
      .apiGetExternalListingById(+id!, false)
      .pipe(map((v) => v.data))
  }
}
