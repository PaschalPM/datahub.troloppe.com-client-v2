import { Injectable } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  switchMap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DebouncedSearchService {
  private searchSubject = new Subject<string>();
  constructor() {}

  emit(searchTerm: string) {
    this.searchSubject.next(searchTerm);
  }

  debouncedObservable<T>(
    observableFunc: (searchTerm: string) => Observable<T>,
    wait = 350
  ) {
    return this.searchSubject.asObservable().pipe(
      debounceTime(wait),
      distinctUntilChanged(),
      switchMap((searchTerm) => {
        return observableFunc(searchTerm);
      })
    );
  }
}
