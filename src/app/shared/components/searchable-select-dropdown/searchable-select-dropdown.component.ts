import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextButtonComponent } from '@core/components/dashboard/text-btn/text-btn.component';
import { PaginatedDataService } from '@core/services/dashboard/property-data/paginated-data.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { ColorSchemeService } from '@shared/services/color-scheme.service';
import { UtilsService } from '@shared/services/utils.service';
import { debounceTime, distinctUntilChanged, map, Observable, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-searchable-select-dropdown',
  standalone: true,
  imports: [FormsModule, NgSelectModule, CommonModule, TextButtonComponent],
  templateUrl: './searchable-select-dropdown.component.html',
  styleUrl: './searchable-select-dropdown.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class SearchableSelectDropdownComponent implements OnDestroy {
  @Input() bindLabel = "name"
  @Input() bindValue = "id"
  @Input() items!: any[]
  @Input() bindSubLabel?: string = 'phone_number'
  @Input() showAddBtn = true
  @Input() loading = false

  mappedItems: any = []
  selectedItem: any;
  currentPage = 1
  searchTerm = ''

  isDarkMode$: Observable<boolean>
  search$ = new Subject<string>();
  destroy$ = new Subject<void>();

  constructor(
    private readonly colorScheme: ColorSchemeService,
    private readonly pptyPDS: PaginatedDataService,
    public readonly utils: UtilsService
  ) {
    this.isDarkMode$ = this.colorScheme.getColorScheme().pipe(map((value) => {
      return value === "dark"
    }))
  }

  ngOnInit(): void {
    this.getPaginatedData()
    this.listenForSearchChange()
  }

  listenForSearchChange() {
    this.search$.pipe(debounceTime(500), distinctUntilChanged(), tap(searchTerm => {
      console.log(searchTerm)
      this.searchTerm = searchTerm
      this.mappedItems = []
      this.currentPage = 1
      this.getPaginatedData()
    }), takeUntil(this.destroy$))
      .subscribe()
  }

  onScrollEnd() {
    this.currentPage++
    this.getPaginatedData()
  }
  emitAddEvent(ev: Event) {

  }
  private getPaginatedData() {
    this.getMappedItems$()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          if (this.currentPage > 1) {
            this.mappedItems = [...this.mappedItems, ...value]
          }
          else {
            this.mappedItems = value
          }
          this.loading = false
        },
      })
  }

  private getMappedItems$() {
    this.loading = true
    const developers$ = this.pptyPDS.getDevelopers(this.currentPage, this.searchTerm).pipe(
      map(v => {
        return v.developers.map((v: any) => {
          if (this.bindSubLabel) {
            const subLabel = v[this.bindSubLabel] as string
            if (subLabel && subLabel.length > 11) {
              return { ...v, [this.bindSubLabel]: `${subLabel.substring(0, 11)}...` }
            }
            return v
          }
        })
      })
    )
    return developers$

  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
