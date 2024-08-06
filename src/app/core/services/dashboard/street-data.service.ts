import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrlFactory, apiHttpOptions } from '@configs/global';
import { BehaviorSubject, map, of, Subscription, switchMap, tap } from 'rxjs';
import { AuthService } from '@shared/services/auth.service';
import { PermissionService } from '@shared/services/permission.service';
import { Router } from '@angular/router';
import { LoaderService } from '@shared/services/loader.service';
import { CacheService } from '@shared/services/cache.service';
import { constructionStatusOptions } from 'app/fixtures/street-data';
import { UtilsService } from '@shared/services/utils.service';

@Injectable({
  providedIn: 'root',
})
export class StreetDataService {
  private streetData$ = new BehaviorSubject<StreetDataColType[] | null>(null);
  private streetDataSubscription!: Subscription;

  constructor(
    private httpClient: HttpClient,
    private auth: AuthService,
    private permission: PermissionService,
    private router: Router,
    private loader: LoaderService,
    private cacheService: CacheService,
    private utils: UtilsService
  ) {}

  getStreetData(revalidate = true) {
    if (revalidate) {
      this.streetDataSubscription = this.retrieveStreetData().subscribe();
    }
    return this.streetData$.asObservable();
  }

  getStreetDataDetails(streetDataId: number) {
    const cachedStreetDatum = this.cacheService.get<StreetData>(
      `street-data/${streetDataId}`
    );
    if (cachedStreetDatum) {
      return of(cachedStreetDatum);
    } else {
      this.loader.start();
      return this.httpClient
        .get<StreetData>(apiUrlFactory(`/street-data/${streetDataId}`))
        .pipe(
          tap((value) => {
            this.cacheService.set<StreetData>(
              `street-data/${streetDataId}`,
              value
            );
            this.loader.stop();
          })
        );
    }
  }

  store(body: any) {
    return this.httpClient
      .post<{ id: number }>(apiUrlFactory(`/street-data`), body, apiHttpOptions)
      .pipe(
        tap(() => {
          this.loader.stop();
        })
      );
  }

  edit(body: any, streetDataId: number) {
    return this.httpClient
      .put(apiUrlFactory(`/street-data/${streetDataId}`), body, apiHttpOptions)
      .pipe(
        tap(() => {
          this.cacheService.remove(`street-data/${streetDataId}`);
          this.loader.stop();
        })
      );
  }

  delete(streetDataId: number) {
    return this.httpClient
      .delete(apiUrlFactory(`/street-data/${streetDataId}`), apiHttpOptions)
      .pipe(
        tap(() => {
          this.cacheService.remove(`street-data/${streetDataId}`);
          this.router.navigateByUrl('/dashboard/street-data');
          this.loader.stop();
        })
      );
  }

  ngOnDestroy(): void {
    this.streetDataSubscription.unsubscribe();
  }

  parseStreetDataForForm(streetData: StreetData, formType: StreetDataFormType) {
    let newStreetDataValue: StreetData;
    console.log(streetData)
    if (streetData) {
      if (formType !== 'view') {
        const valueCopy = { ...streetData };
        valueCopy.section = streetData.section_id as any;
        valueCopy.sector = streetData.sector_id as any;
        valueCopy.sub_sector = streetData.sub_sector_id as any;
        newStreetDataValue = valueCopy;
      } else {
        const valueCopy = { ...streetData };
        valueCopy.sector = this.utils.capitalize(streetData.sector);
        valueCopy.sub_sector = this.utils.capitalize(streetData.sub_sector);
        valueCopy.construction_status = constructionStatusOptions.find(
          (value) => value.value === valueCopy.construction_status
        )?.label as string;
        newStreetDataValue = valueCopy;
      }
      newStreetDataValue.unique_code = streetData.unique_code || 'New Entry';
      return newStreetDataValue;
    }
    return null;
  }
  
  private retrieveStreetData() {
    return this.auth.onCurrentUser().pipe(
      switchMap((currentUser) => {
        return this.httpClient
          .get<StreetDataColType[]>(apiUrlFactory('/street-data'))
          .pipe(
            map((streetDataList) =>
              this.permission.isResearchStaff
                ? streetDataList.filter(
                    (streetData) =>
                      streetData.creator.toLowerCase() ===
                      currentUser?.name.toLowerCase()
                  )
                : streetDataList
            ),
            tap((value) => {
              this.loader.stop();
              this.streetData$.next(value);
            })
          );
      })
    );
  }
}
