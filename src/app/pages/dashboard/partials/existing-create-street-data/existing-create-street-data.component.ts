import { Component, inject, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NewStreetDataSearchSectionComponent } from '@core/components/dashboard/new-street-data-search-section/new-street-data-search-section.component';
import { StreetDataFormComponent } from '@core/components/dashboard/street-data-form/street-data-form.component';
import { NewStreetDataHelperComponent } from '@core/components/helpers/new-street-data-helper/new-street-data-helper.component';
import { StreetDataService } from '@core/services/dashboard/street-data.service';
import { visibleTrigger } from '@shared/animations';
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
  animations: [visibleTrigger],
})
export class ExistingCreateStreetDataComponent extends NewStreetDataHelperComponent {
  selectedStreetDatum!: StreetData;

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

  onExistingCreateStreetData(event: SubmitEvent){
    this.onCreateStreetData(event, 'existing-create')
  }
}
