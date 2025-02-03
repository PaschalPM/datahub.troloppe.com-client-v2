import { JsonPipe } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExternalListingsService } from '@core/services/dashboard/external-listings.service';
import { RouterService } from '@core/services/router.service';
import { LoaderService } from '@shared/services/loader.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [JsonPipe],
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
      this.externalListingsService.getExternalListingsById(+id!)
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

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
