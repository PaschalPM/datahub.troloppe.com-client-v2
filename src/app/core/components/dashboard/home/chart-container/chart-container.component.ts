import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UtilsService } from '@shared/services/utils.service';

@Component({
  selector: 'dashboard-chart-container',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div
      [class]="
        utils.cn(
          'flex relative my-4 justify-between gap-4 items-center rounded-lg w-[99%] flex-wrap p-4 bg-base-300 text-base-content dark:backdrop-blur-md',
          class
        )
      "
    >
      <ng-content> </ng-content>
      @if(href && linkTitle){
        <a [routerLink]="href" class="absolute text-sm right-10 bottom-4 border-dashed border-b border-current">
          {{ linkTitle }}
        </a>
      }
    </div>
  `,
})
export class ChartContainerComponent {
  @Input() class = '';
  @Input() href = '';
  @Input() linkTitle = ''
  constructor(public utils: UtilsService) {}
}
