import { Injectable } from '@angular/core';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { PaginatedDataService } from './paginated-data.service';

@Injectable({
  providedIn: 'root'
})
export class PaginatedSelectFieldService {
  private _loading = false
  private _currentPage = 1
  private _searchTerm = ''
  private _resourceName = ''
  private _subLabel = ''
  private _limitPerPage = 50
  private _items: any = []

  get loading() {
    return this._loading
  }

  get resourceName() {
    return this._resourceName
  }

  get subLabel() {
    return this._subLabel
  }

  get items() {
    return this._items
  }

  destroy$ = new Subject<void>();

  constructor(private readonly pptyPaginatedDS: PaginatedDataService,
  ) { }

  initializeData(resourceName: string, subLabel = '', limitPerPage = 50) {
    this._resourceName = resourceName
    this._subLabel = subLabel
    this._limitPerPage = limitPerPage
    this.fetchItemsForSelectField()
  }

  onSearchParamChange(searchTerm: string) {
    this._searchTerm = searchTerm
    this._items = []
    this._currentPage = 1
    this.fetchItemsForSelectField()
  }

  onScrollEnd() {
    this._currentPage++
    this.fetchItemsForSelectField()
  }

  private fetchItemsForSelectField(): void {
    this._loading = true; // Set loading state
    try {
      const resourceFetchFuncObservable = this.pptyPaginatedDS.getFetchFuncByResourceName(
        this._resourceName,
        this._currentPage,
        this._searchTerm,
        this._limitPerPage
      ) as Observable<any>;

      resourceFetchFuncObservable
        .pipe(
          map((response: any) => {
            // Transform the fetched data
            return response[this._resourceName].map((item: any) => {
              const subValue = item[this._subLabel] as string;
              if (subValue && subValue.length > 11) {
                return { ...item, [this._subLabel]: `${subValue.substring(0, 11)}...` };
              }
              return item;
            });
          }),
          takeUntil(this.destroy$) // Ensure cleanup
        )
        .subscribe({
          next: (value: any) => {
            // Handle paginated data
            this._items = this._currentPage > 1 ? [...this._items, ...value] : value;
            this._loading = false; // Reset loading state
          },
          error: (err: any) => {
            console.error("Error fetching data:", err);
            this._loading = false; // Reset loading state even on error
          },
        });
    } catch (e: any) {
      console.error("Initialization error:", e.message);
      this._loading = false; // Ensure loading state is reset
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
