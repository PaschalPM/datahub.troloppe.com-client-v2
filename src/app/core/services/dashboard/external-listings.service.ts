import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { apiUrlFactory } from '@configs/global';
import { CacheService } from '@shared/services/cache.service';
import { FormSubmissionService } from '@shared/services/form-submission.service';
import { LoaderService } from '@shared/services/loader.service';
import { of, Subject, takeUntil, tap } from 'rxjs';
import { ModalService } from './modal.service';
import { ConfirmModalComponent } from '@core/components/dashboard/modals/confirm-modal/confirm-modal.component';
import { AuthService } from '@shared/services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '@shared/services/alert.service';


@Injectable({
  providedIn: 'root'
})
export class ExternalListingsService implements OnDestroy {
  formGroup!: FormGroup;
  dropdownSelectedData: Record<string, IdAndNameType> = {}
  private destroy$ = new Subject<void>()
  constructor(
    private readonly httpClient: HttpClient,
    private readonly cacheService: CacheService,
    private readonly formSubmissionService: FormSubmissionService,
    private readonly modalService: ModalService,
    private readonly loaderService: LoaderService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly alertService: AlertService,
    private fb: FormBuilder,

  ) {
    this.formGroup = this.fb.group({
      state: ['', [Validators.required]],
      region: ['', [Validators.required]],
      location: ['', [Validators.required]],
      section: ['', [Validators.required]],
      lga: ['', [Validators.required]],
      lcda: ['', [Validators.required]],
      streetName: ['', [Validators.required]],
      streetNumber: [''],
      development: [''],
      sector: ['', [Validators.required]],
      subSector: ['', [Validators.required]],
      subType: [''],
      offer: ['', [Validators.required]],
      noOfBeds: [],
      size: [],
      landArea: [],

      salePrice: [],
      leasePrice: [],
      pricePerSqm: [],
      serviceCharge: [],

      developer: [null, [Validators.required]],
      listingAgent: [null, [Validators.required]],
      listingSource: [null, [Validators.required]],

      comment: [],

    });
  }

  public getPaginatedListings(
    params: Nullable<PaginatedListingsParams> = null,
    invalidateCache = false
  ) {
    // Destructure and set default values for pagination parameters.
    const { limit = 250, currentPage = 1, updatedById = null, agFilterModel, sortBy } = params || {};
    // Constructs the API URL with query parameters for pagination and filtering.
    let url = apiUrlFactory(
      '/external-listings/listings',
      {
        limit: limit.toString(),
        page: currentPage.toString(),
        updated_by_id: updatedById?.toString(),
        ag_filter_model: JSON.stringify(agFilterModel),
        sort_by: sortBy
      }
    );

    if (!invalidateCache) {
      // Attempts to retrieve cached data for the given URL if revalidation is not requested.
      const cachedData = this.cacheService.get<ExternalListingsPaginatedResponseApiType>(url);

      // If cached data exists, return the cached data as an observable.
      if (cachedData) {
        return of(cachedData)
      }
    }

    return this.httpClient.get<ExternalListingsPaginatedResponseApiType>(url).pipe(
      tap((value) => {
        this.cacheService.set(url, value)
      })
    );
  }

  public storeExternalListing(data: any) {
    let url = apiUrlFactory('/external-listings/listings');
    return this.httpClient.post<{ success: boolean, message: string }>(url, data)
  }

  public getExternalListingsById(id: number) {
    let url = apiUrlFactory(`/external-listings/listings/${id}`);
    return this.httpClient.get<{ success: boolean, message: string, data: any }>(url)
  }

  public createExternalListing(creationType: CreationType) {
    this.formSubmissionService.onFormSubmission(this.formGroup);
    if (this.formGroup.valid) {

      this.modalService.open(ConfirmModalComponent, {
        matIconName: 'description',
        title: 'Confirm Data Submission',
        message: 'Proceed if you are sure this form was correctly filled.',
        severity: 'warning',
        ok: async () => {
          this.loaderService.start()
          const mappedData = this.prepareSubmissionData(this.formGroup.value)
          this.storeExternalListing(mappedData).pipe(takeUntil(this.destroy$)).subscribe(
            {
              next: (v) => {
                this.alertService.success(
                  'Success',
                  v.message
                );
                if (creationType === 'createAnother') {
                  this.formGroup.reset()
                } else {
                  this.router.navigateByUrl(
                    `/dashboard/external-listings` // Route to the read only version of resource
                  );
                }
              },

              error: (err) => {
                console.error(err)
                this.alertService.error('Error', 'An error occured while creating a new external listing')
              },

              complete: () => {
                setTimeout(this.loaderService.stop.bind(this.loaderService), 3000)
              }
            }

          )
        }
      })
    }
  }


  private prepareSubmissionData(data: any) {
    const mappedData: Record<string, any> = {
      state_id: parseInt(data['state']),
      region_id: parseInt(data['region']),
      locality_id: parseInt(data['location']),
      section_id: parseInt(data['section']),
      lga_id: parseInt(data['lga']),
      lcda_id: parseInt(data['lcda']),
      street: data['streetName'],
      street_number: data['streetNumber'],
      development: data['development'],
      sector_id: parseInt(data['sector']),
      sub_sector_id: parseInt(data['subSector']),
      offer_id: data['offer'],
      no_of_beds: data['noOfBeds'],
      size: data['size'],
      land_area: data['landArea'],
      sale_price: data['salePrice'],
      lease_price: data['leasePrice'],
      price_per_sqm: data['pricePerSqm'],
      service_charge: data['serviceCharge'],
      developer_id: parseInt(data['developer']),
      listing_agent_id: parseInt(data['listingAgent']),
      listing_source_id: parseInt(data['listingSource']),
      comment: data['comment']
    }

    this.authService.onCurrentUser().subscribe(v => {
      mappedData['updated_by_id'] = v?.id
    })

    return mappedData
  }


  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
