import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SearchableSelectDropdownComponent } from '@shared/components/searchable-select-dropdown/searchable-select-dropdown.component';
@Component({
  selector: 'app-test',
  standalone: true,
  imports: [SearchableSelectDropdownComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {

  formGroup = new FormGroup({})
}
