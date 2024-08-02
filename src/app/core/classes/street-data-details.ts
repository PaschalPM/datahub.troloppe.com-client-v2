import { FormGroup } from '@angular/forms';
import { UserRoles } from '@shared/enums/user-roles';
import { StreetDataService } from '@core/services/dashboard/street-data.service';
import { ActivatedRoute } from '@angular/router';
import { PermissionService } from '@shared/services/permission.service';
import { EventEmitter, inject } from '@angular/core';
import { UtilsService } from '@shared/services/utils.service';
import { LoaderService } from '@shared/services/loader.service';
import { constructionStatusOptions } from 'app/fixtures/street-data';


export class StreetDataDetails {
  streetDataFormGroup!: FormGroup;
  isPermitted = false;
  streetData!: StreetData;
  geolocation = '';
  creator = '';
  createdAt = '';
  dataIsLoaded = false;
  dataNotFound = false;

  protected streetDataId!: number;

  public utils = inject(UtilsService);
  protected streetDataService = inject(StreetDataService);
  protected loader = inject(LoaderService);
  private permissionService = inject(PermissionService);
  private activatedRoute = inject(ActivatedRoute);

  dataLoadedEvent = new EventEmitter();

  constructor() {}

  protected setStreetDataId() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.streetDataId = +id;
    }
  }

  protected setFormDataAndSomeProperties(forEditForm: boolean = false) {
    this.streetDataService.getStreetDataDetails(this.streetDataId).subscribe({
      next: (value) => {
        setTimeout(() => {
          if (value) {
            if (forEditForm) {
              const valueCopy = { ...value };
              valueCopy.section = value.section_id as any;
              valueCopy.sector = value.sector_id as any;
              valueCopy.sub_sector = value.sub_sector_id as any;
              this.streetData = valueCopy;
            } else {
              const valueCopy = { ...value };
              valueCopy.sector = this.utils.capitalize(value.sector);
              valueCopy.sub_sector = this.utils.capitalize(value.sub_sector);
              valueCopy.construction_status = constructionStatusOptions.find((value) => value.value === valueCopy.construction_status)?.label as string
              this.streetData = valueCopy;
            }
            this.streetData.unique_code = value.unique_code || 'New Entry';
            this.streetDataFormGroup.patchValue(this.streetData);
            this.geolocation = decodeURIComponent(value.geolocation);
            this.creator = value.creator;
            this.createdAt = this.utils.utcToFormattedDate(value.created_at);
          }
          this.dataIsLoaded = true;
          this.dataLoadedEvent.emit(this.dataIsLoaded);
        });
      },
      error: (error) => {
        if (error.status === 404) {
          this.dataNotFound = true;
        }
      },
    });
  }

  protected setPermission() {
    this.isPermitted = this.permissionService.isPermitted([
      UserRoles.Admin,
      UserRoles.ResearchManager,
    ]);
  }

  protected checkDataIsLoaded() {
    this.dataLoadedEvent.asObservable().subscribe((value) => {
      if (value) {
        this.loader.stop();
      }
    });
  }
}
