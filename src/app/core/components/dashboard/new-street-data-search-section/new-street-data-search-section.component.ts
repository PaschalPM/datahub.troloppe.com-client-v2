import { Component, EventEmitter, Output } from '@angular/core';
import { SearchInputComponent } from '../search-input/search-input.component';
import { SearchDisplayPaneComponent } from '../search-display-pane/search-display-pane.component';
import { StreetDataSearchedItemComponent } from '../street-data-searched-item/street-data-searched-item.component';
import { SpinnerComponent } from '@shared/components/spinner/spinner.component';
import { StreetDataSearchService } from '@core/services/dashboard/street-data-search.service';
import { map, tap } from 'rxjs';
import { DebouncedSearchService } from '@shared/services/debounced-search.service';
import { ActiveLocationService } from '@core/services/dashboard/active-location.service';

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
    <div class="static flex flex-col z-30">
      <div class="m-auto w-[95%] max-w-xl">
        <dashboard-search-input
          [search]="searchedTerm"
          (searchChange)="onSearchTermChange($event)"
          [placeholder]="placeholder"
        ></dashboard-search-input>
        @if(isSearchDisplayPaneOpen) {
        <dashboard-search-display-pane clx="max-w-xl w-[90%] mt-2 z-50">
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
  debouncedSearchedTerm = '';
  searchedStreetDataItems: SearchedStreetDataType[] | null = null;
  isSearchDisplayPaneOpen = false;
  loadingData = false;
  placeholder = '';

  constructor(
    private streetDataSearchService: StreetDataSearchService,
    private debouncedSearchService: DebouncedSearchService,
    private activeLocationService: ActiveLocationService
  ) {}

  ngOnInit(): void {
    this.debouncedSearchService
      .debouncedObservable(this.fetchSearchStreetDataOptions.bind(this))
      .pipe(
        tap(() => {
          this.debouncedSearchedTerm = this.searchedTerm;
        })
      )
      .subscribe((value) => {
        this.searchedStreetDataItems = value;
      });

    this.activeLocationService.getActiveLocation(false).subscribe((value) => {
      this.placeholder = `Search For Verified Street Data (${value?.name})`;
    });
  }

  onSearchTermChange(searchedTerm: string) {
    this.searchedTerm = searchedTerm;
    if (searchedTerm.length == 1) {
      this.loadingData = true;
      this.isSearchDisplayPaneOpen = true;
    }
    if (searchedTerm.length <= 0) {
      this.debouncedSearchedTerm = '';
      this.loadingData = false;
      this.isSearchDisplayPaneOpen = false;
    }

    this.debouncedSearchService.emit(this.searchedTerm);
  }

  onSearchedStreetDataClick(streetData: SearchedStreetDataType) {
    this.selectedStreetDataEvent.emit(streetData);
    this.isSearchDisplayPaneOpen = false;
    this.searchedTerm = '';
    this.debouncedSearchedTerm = '';
    this.searchedStreetDataItems = null;
  }
  private fetchSearchStreetDataOptions(searchedTerm: string = '') {
    if (searchedTerm.length > 1) {
      this.loadingData = true;
    }
    return this.streetDataSearchService.query(searchedTerm).pipe(
      tap(() => {
        this.loadingData = false;
      }),
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
}
