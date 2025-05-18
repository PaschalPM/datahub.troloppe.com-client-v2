import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrlFactory } from '@configs/global';
import { CacheService } from '@shared/services/cache.service';
import { map, of, tap } from 'rxjs';

type InitialDataType = {
  states: IdAndNameType[];
  sectors: IdAndNameType[];
  offers: IdAndNameType[];
};

@Injectable({
  providedIn: 'root',
})
export class InitialDataService {
  constructor(
    private httpClient: HttpClient,
    private cacheService: CacheService,
  ) { }

  private getData(invalidateCache: boolean) {

    const url = apiUrlFactory('/property-data/initial');
    const cachedData = !invalidateCache ? this.cacheService.get<InitialDataType>(url) : null

    return cachedData
      ? of(cachedData)
      : this.httpClient.get<InitialDataType>(url);
  }

  private getSinglePropertyData(url: string, invalidateCache = false) {
    url = apiUrlFactory(`/property-data${url}`)
    const cachedData = !invalidateCache ? this.cacheService.get<IdAndNameType>(url) : null

    return cachedData ? of(cachedData)
      : this.httpClient.get<IdAndNameType>(url).pipe(
        tap((value) => this.cacheService.set(url, value))
      );
  }

  getAllStates(invalidateCache = true) {
    return this.getData(invalidateCache).pipe(map((value) => value.states));
  }

  getAllSectors(invalidateCache = true) {
    return this.getData(invalidateCache).pipe(map((value) => value.sectors));
  }

  getAllOffers(invalidateCache = true) {
    return this.getData(invalidateCache).pipe(map((value) => value.offers));
  }

  getDeveloperById(id: number, invalidateCache = false) {
    const url = `/developers/${id}`
    return this.getSinglePropertyData(url, invalidateCache)
  }

  getListingAgentById(id: number, invalidateCache = false) {
    const url = `/listing-agents/${id}`
    return this.getSinglePropertyData(url, invalidateCache)
  }

  getListingSourceById(id: number, invalidateCache = false) {
    const url = `/listing-sources/${id}`
    return this.getSinglePropertyData(url, invalidateCache)
  }

  getSingleFetchFuncByResourceName(resourceName: string, id: number, invalidateCache = false) {
    switch (resourceName) {
      case "developers":
        return this.getDeveloperById(id, invalidateCache)
      case "listingAgents":
        return this.getListingAgentById(id, invalidateCache)
      case "listingSources":
        return this.getListingSourceById(id, invalidateCache)
      default:
        throw new Error("Invalid resource name supplied...")
    }
  }
}
