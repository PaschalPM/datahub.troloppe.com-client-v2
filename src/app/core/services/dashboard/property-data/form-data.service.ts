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

  private getPropertyData(url: string, key: string, invalidateCache = false) {
    url = apiUrlFactory(`/property-data${url}`)
    const cachedData = !invalidateCache ? this.cacheService.get<IdAndNameType[]>(url) : null

    return cachedData ? of(cachedData)
      : this.httpClient.get<Record<string, IdAndNameType[]>>(url).pipe(
        map((value) => value[key]),
        tap((value) => this.cacheService.set(url, value))
      );
  }

  getLgasByRegionId(regionId: number, invalidateCache = false) {
    const url = `/lgas?region_id=${regionId}`;
    return this.getPropertyData(url, "lgas", invalidateCache)
  }

  getLcdasByLgaId(lgaId: number, invalidateCache = false) {
    const url = `/lcdas?lga_id=${lgaId}`;
    return this.getPropertyData(url, "lcdas", invalidateCache)
  }

  getLocationsByRegionId(regionId: number, invalidateCache = false) {
    const url = `/locations?region_id=${regionId}`;
    return this.getPropertyData(url, 'locations', invalidateCache)
  }

  getRegionsByStateId(stateId: number, invalidateCache = false) {
    const url = `/regions?state_id=${stateId}`;
    return this.getPropertyData(url, 'regions', invalidateCache)
  }

  getSectionsByLocationId(locationId: number, invalidateCache = false) {
    const url = `/sections?location_id=${locationId}`;
    return this.getPropertyData(url, 'sections', invalidateCache)
  }

  getSubSectorsBySectorId(sectorId: number, invalidateCache = false) {
    const url = `/sub-sectors?sector_id=${sectorId}`;
    return this.getPropertyData(url, 'sub_sectors', invalidateCache)

  }
}
