import { Component, Input } from '@angular/core';
import { UtilsService } from '@shared/services/utils.service';

@Component({
  selector: 'dashboard-search-display-pane',
  standalone: true,
  imports: [],
  template: `
    <div
      [class]="
        utils.cn(
          'shadow-lg border-b border-r bg-base-100/20 border-base-content max-h-72 min-h-12 space-y-1w overflow-auto absolute w-full z-25',
          clx
        )
      "
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: `
    :host{
      display: contents
    }
  `,
})
export class SearchDisplayPaneComponent {
  @Input() clx = '';
  constructor(protected utils: UtilsService) {}
}
