import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  loaderEvent = new EventEmitter<{ isOpen: boolean; text: string }>();

  constructor() {}

  start(text: string = '') {
    this.loaderEvent.next({ isOpen: true, text });
  }

  stop() {
    this.loaderEvent.next({ isOpen: false, text: '' });
  }
}
