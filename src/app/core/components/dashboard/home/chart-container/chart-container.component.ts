import { Component, Input } from '@angular/core';
import { UtilsService } from '@shared/services/utils.service';

@Component({
  selector: 'dashboard-chart-container',
  standalone: true,
  imports: [],
  template: `
    <div
      [class]="
        utils.cn(
          'flex my-4 justify-between gap-4 items-center rounded-lg w-[99%] flex-wrap p-4 bg-base-300 text-base-content dark:backdrop-blur-md',
          class
        )
      "
    >
      <ng-content> </ng-content>
    </div>
  `,
})
export class ChartContainerComponent {
  @Input() class = '';
  constructor(public utils: UtilsService) {}
}
