import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'dashboard-search-input',
  standalone: true,
  imports: [FormsModule],
  template: `<input type="search" class="grow input w-full input-sm lg:input-md input-bordered" [ngModel]="search"
    (ngModelChange)="onSearchChange($event)" [placeholder]="placeholder">`,
  styles: `
    :host {
      display: contents
    }
  `
})
export class SearchInputComponent {
  @Input({ required: true }) search = ''
  @Input() debounceTime = 1000
  @Input() placeholder = 'Search'

  @Output() searchChange = new EventEmitter<string>()
  @Output() debouncedSearchChange = new EventEmitter<string>()
  private debouncer = new Subject<void>()
  private debouncerSubscription!: Subscription


  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer.asObservable().pipe(debounceTime(this.debounceTime)).subscribe(() => {
      this.debouncedSearchChange.emit(this.search)
    })
  }

  onSearchChange(value: string) {
    this.search = value
    this.searchChange.emit(this.search)
    this.debouncer.next()
  }

  ngOnDestroy(): void {
    this.debouncerSubscription.unsubscribe()
  }

}
