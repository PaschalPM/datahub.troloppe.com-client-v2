import { Component, Input } from '@angular/core';
import { MyMatIconComponent } from '@shared/components/my-mat-icon/my-mat-icon.component';

@Component({
  selector: 'dashboard-widget-overview',
  standalone: true,
  imports: [MyMatIconComponent],
  template: `
    <div
      class="rounded-lg bg-base-300 p-4 shadow-md backdrop-blur-lg"
    >
      <div>
        <h2 class="text-2xl font-medium">{{ totalSum }}</h2>
        <small class="text-base-content/75">
          {{ overviewTitle }}
        </small>
      </div>
      <div class="text-right ">
        <my-mat-icon class="text-secondary/75"> {{ myMatIcon }} </my-mat-icon>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: contents;
    }
  `,
})
export class OverviewComponent {
  @Input({ required: true }) totalSum = 0;
  @Input({ required: true }) overviewTitle = '';
  @Input({ required: true }) myMatIcon = '';
}
