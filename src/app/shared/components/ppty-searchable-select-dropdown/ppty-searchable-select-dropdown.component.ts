import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { SearchableSelectDropdownComponent } from "../searchable-select-dropdown/searchable-select-dropdown.component";
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { PaginatedSelectFieldService } from '@core/services/dashboard/property-data/paginated-select-field.service';
import { InitialDataService } from '@core/services/dashboard/property-data/initial-data.service';

@Component({
  selector: 'app-ppty-searchable-select-dropdown',
  standalone: true,
  imports: [SearchableSelectDropdownComponent],
  providers: [PaginatedSelectFieldService],
  templateUrl: './ppty-searchable-select-dropdown.component.html',
  styleUrl: './ppty-searchable-select-dropdown.component.scss'
})

export class PptySearchableSelectDropdownComponent implements OnDestroy {
  @Input({ required: true }) name!: string
  @Input({ required: true }) label!: string
  @Input({ required: true }) formGroup!: FormGroup
  @Input({ required: true }) resourceName!: string
  @Input() subLabel = ''

  @Output() valueChange = new EventEmitter()

  selectedItem: Nullable<IdAndNameType> = null

  get loading() {
    return this.pptyPaginatedSFS.loading
  }

  get items() {

    if (this.selectedItem && this.pptyPaginatedSFS.items) {
      let selectItems = (this.pptyPaginatedSFS.items as IdAndNameType[]);
      const item = selectItems.find((v) => v.id === this.selectedItem?.id)
      if (item) {
        selectItems = selectItems.filter((v) => v.id !== item.id)
      }
      setTimeout(() => {
        
        this.selectedItem = null
      }, 0);
      return [this.selectedItem, ...selectItems]
    }

    return this.pptyPaginatedSFS.items

  }

  get pptySubLabel() {
    return this.pptyPaginatedSFS.subLabel
  }

  private destroy$ = new Subject<void>();

  constructor(
    private readonly pptyPaginatedSFS: PaginatedSelectFieldService,
    private readonly initialDataService: InitialDataService
  ) { }

  ngOnInit(): void {
    const selectedValue = this.formGroup.controls[this.name].value
    this.setFormControl(null)

    if (selectedValue) {
      this.initialDataService.getSingleFetchFuncByResourceName(this.resourceName, +selectedValue).subscribe({
        next: (value) => {
          this.selectedItem = value
          this.setFormControl(selectedValue)
        },
      })
    }
    this.pptyPaginatedSFS.initializeData(this.resourceName, this.subLabel, 100)
  }

  onScrollEnd() {
    return this.pptyPaginatedSFS.onScrollEnd()
  }

  onSearchParamChange(event: string) {
    return this.pptyPaginatedSFS.onSearchParamChange(event)
  }

  private setFormControl(value: any) {
    this.formGroup.controls[this.name].setValue(value)
    this.formGroup.controls[this.name].updateValueAndValidity()
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
