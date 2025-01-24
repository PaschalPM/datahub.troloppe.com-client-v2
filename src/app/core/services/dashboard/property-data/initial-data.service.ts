import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrlFactory } from '@configs/global';
import { CacheService } from '@shared/services/cache.service';
import { map, of } from 'rxjs';

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

  getAllStates(invalidateCache = false) {
    return this.getData(invalidateCache).pipe(map((value) => value.states));
  }

  getAllSectors(invalidateCache = false) {
    return this.getData(invalidateCache).pipe(map((value) => value.sectors));
  }

  getAllOffers(invalidateCache = false) {
    return this.getData(invalidateCache).pipe(map((value) => value.offers));
  }
}
