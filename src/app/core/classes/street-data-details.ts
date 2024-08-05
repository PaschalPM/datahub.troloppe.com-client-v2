import { FormGroup } from '@angular/forms';
import { UserRoles } from '@shared/enums/user-roles';
import { StreetDataService } from '@core/services/dashboard/street-data.service';
import { ActivatedRoute } from '@angular/router';
import { PermissionService } from '@shared/services/permission.service';
import { EventEmitter, inject } from '@angular/core';
import { UtilsService } from '@shared/services/utils.service';
import { LoaderService } from '@shared/services/loader.service';

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

  protected initFormDataAndSomeProperties(formType: Exclude<StreetDataFormType, 'new-create' | 'existing-create'> = 'view') {
    this.streetDataService.getStreetDataDetails(this.streetDataId).subscribe({
      next: (value) => {
        setTimeout(() => {
          if (value) {
            this.streetData = this.streetDataService.parseStreetDataForForm(value, formType) as StreetData
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
