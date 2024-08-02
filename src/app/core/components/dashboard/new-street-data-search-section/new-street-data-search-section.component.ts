import { Component, EventEmitter, Output } from '@angular/core';
import { SearchInputComponent } from '../search-input/search-input.component';
import { SearchDisplayPaneComponent } from '../search-display-pane/search-display-pane.component';
import { StreetDataSearchedItemComponent } from '../street-data-searched-item/street-data-searched-item.component';
import { SpinnerComponent } from '@shared/components/spinner/spinner.component';

@Component({
  selector: 'new-street-data-search-section',
  standalone: true,
  imports: [
    SearchInputComponent,
    SearchDisplayPaneComponent,
    StreetDataSearchedItemComponent,
    SpinnerComponent,
  ],
  template: `
    <div class="static flex flex-col">
      <div class="m-auto w-full max-w-xl">
        <dashboard-search-input
          [(search)]="search"
          (debouncedSearchChange)="debouncedSearch = $event"
          [debounceTime]="500"
          placeholder="Search For Verified Street Data"
        ></dashboard-search-input>
        @if(search) {
        <dashboard-search-display-pane clx="max-w-xl mt-2">
          @if (debouncedSearch) { @for (item of searchedStreetDataItems; track
          $index) {
          <street-data-searched-item
            [searchedStreetData]="item"
            (clickEvent)="onSearchedStreetDataClick($event)"
          ></street-data-searched-item>
          } } @else {
          <div class="h-12 flex justify-center items-center">
            <app-spinner></app-spinner>
          </div>
          }
        </dashboard-search-display-pane>
        }
      </div>
    </div>
  `,
})
export class NewStreetDataSearchSectionComponent {
  @Output() selectedStreetDataEvent =
    new EventEmitter<SearchedStreetDataType>();

  search = '';
  debouncedSearch = '';
  searchedStreetDataItems: SearchedStreetDataType[] = [
    {
      id: 1,
      streetAddresss: 'No 18 Isa Sule Close',
      developmentName: 'Development One',
      imageUrl: 'https://picsum.photos/200/300',
      uniqueCode: 'IKJ/OSI/46/2399',
    },
    {
      id: 2,
      streetAddresss: 'No 102 Isa Sule Close',
      developmentName: 'Development tWO',
      imageUrl: 'https://picsum.photos/200/300',
      uniqueCode: 'IKJ/OSI/46/JH99',
    },
  ];

  onSearchedStreetDataClick(streetData: SearchedStreetDataType) {
    this.selectedStreetDataEvent.emit(streetData);
  }
}
