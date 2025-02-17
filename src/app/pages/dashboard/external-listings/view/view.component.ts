import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TextButtonComponent } from '@core/components/dashboard/text-btn/text-btn.component';
import { ExternalListingsService } from '@core/services/dashboard/external-listings.service';
import { RouterService } from '@core/services/router.service';
import { LoaderService } from '@shared/services/loader.service';
import { Subject, takeUntil } from 'rxjs';
import { BackBtnComponent } from "../../../../shared/components/back-btn/back-btn.component";
import { SpinnerComponent } from "../../../../shared/components/spinner/spinner.component";

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [TextButtonComponent, BackBtnComponent, SpinnerComponent],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent implements OnDestroy {
  externalListingData: any
  private destroy$ = new Subject<void>()

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: RouterService,
    private readonly externalListingsService: ExternalListingsService,
    private readonly loaderService: LoaderService
  ) {

  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    const storedData = this.router.getState(`/dashboard/external-listings/${id}`)

    if (storedData) {
      this.externalListingData = storedData
    }

    else {
      this.loaderService.start()
      this.externalListingsService.apiGetExternalListingById(+id!)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (value) => {
            this.externalListingData = value.data
            if (!value.success) {
              this.router.navigateByUrl('/not-found')
            }
          },
          complete: () => {
            this.loaderService.stop()
          }
        })
    }
  }

  // Exclude updated_by_id key
  get externalListingDataKeys() {
    return this.externalListingData && Object.keys(this.externalListingData).filter((v) => !(v == 'updated_by_id' || v == 'id'))
  }

  goToEditExternalListing() {
    const id = this.externalListingData.id
    this.router.navigateByUrl(`/dashboard/external-listings/${id}/edit`)
  }

  deleteExternalListing() {
    const id = this.externalListingData.id
    this.externalListingsService.deleteExternalListing(id)
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
