import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrlFactory } from '@configs/global';
import { CacheService } from '@shared/services/cache.service';
import { LoaderService } from '@shared/services/loader.service';
import { of, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ExternalListingsService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly cacheService: CacheService,
  ) { }


  public getPaginatedListings(
    params: Nullable<PaginatedListingsParams> = null,
    invalidateCache = false
  ) {
    // Destructure and set default values for pagination parameters.
    const { limit = 10, currentPage = 1, updatedById = null, agFilterModel, sortBy } = params || {};

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

}
