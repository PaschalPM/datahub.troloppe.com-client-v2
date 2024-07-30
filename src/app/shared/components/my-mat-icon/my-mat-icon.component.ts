import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsService } from '@shared/services/utils.service';

@Component({
  selector: 'my-mat-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-template #projected>
      <ng-content />
    </ng-template>
    <i [class]="utils.cn('material-icons', clx)">
      <ng-container *ngTemplateOutlet="projected" />
    </i>
  `,
  styles: `
    :host{
      display: contents;
    }
  `,
})
export class MyMatIconComponent {
  @Input() clx = ''
  constructor(protected utils: UtilsService){}
}
