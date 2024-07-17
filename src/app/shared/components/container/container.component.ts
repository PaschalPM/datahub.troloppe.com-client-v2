import { Component, Input } from '@angular/core';
import { UtilsService } from '@shared/services/utils.service';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [],
  template: `
    <div [class]="utils.cn('container  mx-auto px-2', clx)">
      <ng-content></ng-content>
    </div>
  `,
  styles: `
    
  `,
})
export class ContainerComponent {
  @Input() clx = '';

  constructor(public utils: UtilsService) {}
}
