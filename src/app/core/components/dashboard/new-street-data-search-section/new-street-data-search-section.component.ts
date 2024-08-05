import { Component, EventEmitter, Output } from '@angular/core';
import { SearchInputComponent } from '../search-input/search-input.component';
import { SearchDisplayPaneComponent } from '../search-display-pane/search-display-pane.component';
import { StreetDataSearchedItemComponent } from '../street-data-searched-item/street-data-searched-item.component';
import { SpinnerComponent } from '@shared/components/spinner/spinner.component';
import { StreetDataSearchService } from '@core/services/dashboard/street-data-search.service';
import { delay, map, Observable, of, startWith, tap } from 'rxjs';
import { DebouncedSearchService } from '@shared/services/debounced-search.service';

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
      <div class="m-auto w-[95%] max-w-xl">
        <dashboard-search-input
          [search]="searchedTerm"
          (focusEvent)="onFocusFetchData($event)"
          (blurEvent)="isSearchDisplayPaneOpen = false"
          (searchChange)="onSearchTermChange($event)"
          placeholder="Search For Verified Street Data"
        ></dashboard-search-input>
        @if(isSearchDisplayPaneOpen || searchedTerm) {
        <dashboard-search-display-pane clx="max-w-xl w-[90%] mt-2">
          @if(loadingData){
          <div class="h-12 flex justify-center items-center">
            <app-spinner></app-spinner>
          </div>
          } @else { @if(searchedStreetDataItems &&
          searchedStreetDataItems.length) { @for (item of
          searchedStreetDataItems; track $index) {
          <street-data-searched-item
            [searchedStreetData]="item"
            (clickEvent)="onSearchedStreetDataClick($event)"
          ></street-data-searched-item>
          } } @else {
          <div class="h-12 flex justify-center items-center text-sm">
            No record found.
          </div>
          } }
        </dashboard-search-display-pane>
        }
      </div>
    </div>
  `,
})
export class NewStreetDataSearchSectionComponent {
  @Output() selectedStreetDataEvent =
    new EventEmitter<SearchedStreetDataType>();

  searchedTerm = '';
  searchedStreetDataItems: SearchedStreetDataType[] | null = null;
  isSearchDisplayPaneOpen = false;
  loadingData = false;

  constructor(
    private streetDataSearchService: StreetDataSearchService,
    private debouncedSearchService: DebouncedSearchService
  ) {}

  ngOnInit(): void {
    this.debouncedSearchService
      .debouncedObservable(this.fetchSearchStreetDataOptions.bind(this))
      .pipe(tap(() => (this.loadingData = false)))
      .subscribe((value) => {
        this.searchedStreetDataItems = value;
      });
  }

  onSearchTermChange(searchedTerm: string) {
    this.searchedTerm = searchedTerm;
    this.debouncedSearchService.emit(this.searchedTerm);
  }

  onFocusFetchData(searchedTerm: string) {
    this.isSearchDisplayPaneOpen = true
    if (!searchedTerm)
    this.fetchSearchStreetDataOptions()
      .pipe(tap(() => (this.loadingData = false)))
      .subscribe((value) => {
        this.searchedStreetDataItems = value;
      });
  }

  private fetchSearchStreetDataOptions(searchedTerm: string = '') {
    this.loadingData = true;
    return this.streetDataSearchService.query(searchedTerm).pipe(
      map((value) => {
        return value.map((v) => ({
          id: v.id,
          uniqueCode: v.unique_code,
          streetAddress: v.street_address,
          developmentName: v.development_name,
          imagePath: v.image_path,
        }));
      })
    );
  }
  onSearchedStreetDataClick(streetData: SearchedStreetDataType) {
    this.selectedStreetDataEvent.emit(streetData);
  }
}