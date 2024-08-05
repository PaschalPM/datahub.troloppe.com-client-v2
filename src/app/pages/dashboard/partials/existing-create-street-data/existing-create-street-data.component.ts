import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NewStreetDataSearchSectionComponent } from '@core/components/dashboard/new-street-data-search-section/new-street-data-search-section.component';
import { StreetDataFormComponent } from '@core/components/dashboard/street-data-form/street-data-form.component';
import { StreetDataService } from '@core/services/dashboard/street-data.service';
import { SpinnerComponent } from '@shared/components/spinner/spinner.component';
import { UserRoles } from '@shared/enums/user-roles';
import { PermissionService } from '@shared/services/permission.service';

@Component({
  selector: 'existing-create-street-data',
  standalone: true,
  imports: [
    NewStreetDataSearchSectionComponent,
    SpinnerComponent,
    StreetDataFormComponent,
  ],
  templateUrl: './existing-create-street-data.component.html',
})
export class ExistingCreateStreetDataComponent {
  @Input({ required: true }) streetDataFormGroup!: FormGroup;

  isPermitted = false;
  selectedStreetDatum!: StreetData;

  constructor(
    private streetDataService: StreetDataService,
    private permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.setPermission();
  }

  fetchStreetData(searchedStreetData: SearchedStreetDataType) {
    this.streetDataService
      .getStreetDataDetails(searchedStreetData.id)
      .subscribe((value) => {
        if (value) {
          let streetData = this.streetDataService.parseStreetDataForForm(
            value,
            'existing-create'
          ) as StreetData;
          this.streetDataFormGroup.patchValue(streetData);
          this.streetDataFormGroup
            .get('image')
            ?.patchValue(streetData.image_path);
          this.selectedStreetDatum = value;
        }
      });
  }

  onExistingCreateStreetData() {}

  ngOnDestroy(): void {
    this.streetDataFormGroup.reset();
  }
  private setPermission() {
    this.isPermitted = this.permissionService.isPermitted([
      UserRoles.Admin,
      UserRoles.ResearchManager,
    ]);
  }
}
