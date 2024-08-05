import { Component } from '@angular/core';
import { NewStreetDataSearchSectionComponent } from '@core/components/dashboard/new-street-data-search-section/new-street-data-search-section.component';

@Component({
  selector: 'existing-create-street-data',
  standalone: true,
  imports: [NewStreetDataSearchSectionComponent],
  templateUrl: './existing-create-street-data.component.html',
})
export class ExistingCreateStreetDataComponent {
  fetchStreetData(searchedStreetData: SearchedStreetDataType) {
    console.log('Hello')
    console.log(searchedStreetData);
  }
}
