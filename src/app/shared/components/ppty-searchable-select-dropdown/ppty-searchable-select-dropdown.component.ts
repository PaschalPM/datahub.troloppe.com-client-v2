import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { SearchableSelectDropdownComponent } from "../searchable-select-dropdown/searchable-select-dropdown.component";
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { PaginatedSelectFieldService } from '@core/services/dashboard/property-data/paginated-select-field.service';

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
  
  private destroy$ = new Subject<void>();

  constructor(
    public readonly pptyPaginatedSFS: PaginatedSelectFieldService
  ) { }

  ngOnInit(): void {
    this.pptyPaginatedSFS.initializeData(this.resourceName, this.subLabel, 100)
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
