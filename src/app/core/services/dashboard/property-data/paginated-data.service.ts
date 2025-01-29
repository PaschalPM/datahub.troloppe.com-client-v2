import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrlFactory } from '@configs/global';
import { CacheService } from '@shared/services/cache.service';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginatedDataService {

  constructor(
    private httpClient: HttpClient,
    private cacheService: CacheService
  ) { }

  private getPropertyData<K extends string>(url: string, key: string, invalidateCache = false) {
    url = apiUrlFactory(`/property-data${url}`)
    const cachedData = !invalidateCache ? this.cacheService.get<PaginationMetaDataResponse & Record<K, any>>(url) : null

    return cachedData ? of(cachedData)
      : this.httpClient.get<PaginationMetaDataResponse & Record<K, any>>(url).pipe(
        tap((value) => this.cacheService.set(url, value))
      );
  }

  getDevelopers(page = 1, searchTerm: string = '', limit = 50, invalidateCache = false) {
    const url = `/developers?limit=${limit}&page=${page}&q=${searchTerm}`
    return this.getPropertyData<'developers'>(url, 'developers', invalidateCache)
  }

  getListingAgents(page = 1, searchTerm: string = '', limit = 50, invalidateCache = false) {
    const url = `/listing-agents?limit=${limit}&page=${page}&q=${searchTerm}`
    return this.getPropertyData<'listingAgents'>(url, 'listing_agents', invalidateCache)
  }

  getListingSources(page = 1, searchTerm: string = '', limit = 50, invalidateCache = false) {
    const url = `/listing-sources?limit=${limit}&page=${page}&q=${searchTerm}`
    return this.getPropertyData<'listingSources'>(url, 'listing_sources', invalidateCache)
  }

  getFetchFuncByResourceName(resourceName: string, page = 1, searchTerm: string = '', limit = 50, invalidateCache = false){
    switch(resourceName){
      case "developers":
        return this.getDevelopers(page, searchTerm, limit, invalidateCache)
      case "listingAgents":
        return this.getListingAgents(page, searchTerm, limit, invalidateCache)
      case "listingSources":
        return this.getListingSources(page, searchTerm, limit, invalidateCache)
      default:
        throw new Error("Invalid resource name supplied...")
    }
  }
}
