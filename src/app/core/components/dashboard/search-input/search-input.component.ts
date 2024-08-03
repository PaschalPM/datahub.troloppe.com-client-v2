import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'dashboard-search-input',
  standalone: true,
  imports: [FormsModule],
  template: `<input
    type="search"
    class="grow input w-full input-sm lg:input-md input-bordered"
    [ngModel]="search"
    (ngModelChange)="onSearchChange($event)"
    (focus)="onFocus()"
    (blur)="onBlur()"
    (input)="onClearInput()"
    [placeholder]="placeholder"
  />`,
  styles: `
    :host {
      display: contents
    }
  `,
})
export class SearchInputComponent {
  @Input({ required: true }) search = '';
  @Input() placeholder = 'Search';

  @Output() searchChange = new EventEmitter<string>();
  @Output() focusEvent = new EventEmitter<string>();
  @Output() blurEvent = new EventEmitter<string>();
  @Output() clearInputEvent = new EventEmitter<string>();

  onSearchChange(value: string) {
    this.search = value;
    this.searchChange.emit(this.search);
  }

  onFocus(){
    this.focusEvent.emit(this.search)
  }

  onBlur()
  {
    this.blurEvent.emit()
  }

  onClearInput(){
    if (!this.search){
      this.clearInputEvent.emit()
    }
  }
}
