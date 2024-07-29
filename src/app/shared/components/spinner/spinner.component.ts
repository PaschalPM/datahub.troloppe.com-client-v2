import { Component, Input } from '@angular/core';
import { UtilsService } from '@shared/services/utils.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  template: `
    <span [class]="utils.cn('loading loading-spinner text-base-content', clx)"></span>
  `,
  styles: `
    :host{
      display: contents
    }
  `
})
export class SpinnerComponent {
  @Input() clx = ''
  constructor(public utils: UtilsService){}
}
