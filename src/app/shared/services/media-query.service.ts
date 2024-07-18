import { Injectable } from '@angular/core';
import { fromEvent, map, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MediaQueryService {
  constructor() {}

  observe(query: string) {
    const mediaquery: MediaQueryList = window.matchMedia(query);

    return fromEvent<MediaQueryList>(mediaquery, 'change').pipe(
      map((event) => event.matches),
      startWith(mediaquery.matches)
    );
  }
}
