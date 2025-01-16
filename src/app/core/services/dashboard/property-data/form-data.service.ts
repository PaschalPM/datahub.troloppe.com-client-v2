import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrlFactory } from '@configs/global';
import { CacheService } from '@shared/services/cache.service';
import { map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  constructor(
    private httpClient: HttpClient,
    private cacheService: CacheService
  ) { }

  private getData(url: string, key: string, invalidateCache = false) {
    const cachedData = !invalidateCache ? this.cacheService.get<IdAndNameType[]>(url) : null

    return cachedData ? of(cachedData)
      : this.httpClient.get<Record<string, IdAndNameType[]>>(apiUrlFactory(url)).pipe(
        map((value) => value[key]),
        tap((value) => this.cacheService.set(url, value))
      );
  }

  getLgasByRegionId(regionId: number, invalidateCache = false) {
    const url = `/property-data/lgas?region_id=${regionId}`;
    return this.getData(url, "lgas", invalidateCache)
  }

  getLcdasByLgaId(lgaId: number, invalidateCache = false) {
    const url = `/property-data/lcdas?lga_id=${lgaId}`;
    return this.getData(url, "lcdas", invalidateCache)
  }

  getLocationsByRegionId(regionId: number, invalidateCache = false) {
    const url = `/property-data/locations?region_id=${regionId}`;
    return this.getData(url, 'locations', invalidateCache)
  }

  getRegionsByStateId(stateId: number, invalidateCache = false) {
    const url = `/property-data/regions?state_id=${stateId}`;
    return this.getData(url, 'regions', invalidateCache)
  }

  getSectionsByLocationId(locationId: number, invalidateCache = false) {
    const url = `/property-data/sections?location_id=${locationId}`;
    return this.getData(url, 'sections', invalidateCache)
  }

  getSubSectorsBySectorId(sectorId: number, invalidateCache = false) {
    const url = `/property-data/sub-sectors?sector_id=${sectorId}`;
    return this.getData(url, 'sub_sectors', invalidateCache)

  }
}
