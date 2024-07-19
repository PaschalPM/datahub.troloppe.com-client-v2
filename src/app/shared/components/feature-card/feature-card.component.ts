import { Component, Input } from '@angular/core';
import { UtilsService } from '@shared/services/utils.service';

@Component({
  selector: 'feature-card',
  standalone: true,
  imports: [],
  template: `
    <div class="card bg-base-200 text-base-content relative">
      <div class="card-body mt-4">
        <div
          [class]="
            utils.cn(
              'size-16 rounded-full absolute -top-[18%]',
              featureDetails.circleBgClx
            )
          "
        ></div>
        <h2 class="card-title font-semibold">{{ featureDetails.title }}</h2>
        <p class="text-sm text-base-content/75">
          {{ featureDetails.body }}
        </p>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: contents
    }
  `,
})
export class FeatureCardComponent {
  @Input({ required: true }) featureDetails!: FeatureDetailsType;

  constructor(public utils: UtilsService) {}
}
