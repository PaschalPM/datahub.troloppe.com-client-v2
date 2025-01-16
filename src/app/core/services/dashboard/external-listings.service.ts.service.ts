import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrlFactory } from '@configs/global';
import { CacheService } from '@shared/services/cache.service';
import { LoaderService } from '@shared/services/loader.service';
import { of, tap } from 'rxjs';

type PaginatedListingsParams = {
  limit?: number,
  currentPage?: number,
  updatedById?: Nullable<number>
}

@Injectable({
  providedIn: 'root'
})
export class ExternalListingsService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly loader: LoaderService,
    private readonly cacheService: CacheService,
  ) { }


  public getPaginatedListings(
    params: Nullable<PaginatedListingsParams> = null,
    invalidateCache = false
  ) {
    // Destructure and set default values for pagination parameters.
    const { limit = 10, currentPage = 1, updatedById = null } = params || {};

    // Constructs the API URL with query parameters for pagination and filtering.
    let url = apiUrlFactory(
      `/external-listings/listings?limit=${limit}&page=${currentPage}`
    );

    if (updatedById) {
      url += `&updated_by_id=${updatedById}`
    }

    if (!invalidateCache) {
      // Attempts to retrieve cached data for the given URL if revalidation is not requested.
      const cachedData = this.cacheService.get<ExternalListingsPaginatedResponseApiType>(url);

      // If cached data exists, return the cached data as an observable.
      if (cachedData) return of(cachedData);
    }

    this.loader.start();

    return this.httpClient.get<ExternalListingsPaginatedResponseApiType>(url).pipe(
      tap((value) => {
        this.cacheService.set(url, value)
        this.loader.stop();
      })
    );
  }

}
