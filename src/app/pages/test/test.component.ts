import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PaginatedSelectFieldService } from '@core/services/dashboard/property-data/paginated-select-field.service';
import { SearchableSelectDropdownComponent } from '@shared/components/searchable-select-dropdown/searchable-select-dropdown.component';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-test',
  standalone: true,
  imports: [SearchableSelectDropdownComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent implements OnDestroy {
  formGroup!: FormGroup
  destroy$ = new Subject<void>();

  constructor(
    private readonly fb: FormBuilder,
    public readonly pptyPaginatedSFS: PaginatedSelectFieldService
  ) {
    this.formGroup = this.fb.group({
      developers: [null]
    })

  }

  ngOnInit(): void {
    this.pptyPaginatedSFS.initializeData("developers", "phone_number", 100)
  }

  openDeveloperFormModal() {
    alert("openDeveloperFormModal")
  }


  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
