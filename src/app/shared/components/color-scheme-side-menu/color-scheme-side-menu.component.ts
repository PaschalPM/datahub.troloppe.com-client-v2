import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ColorSchemeService } from '@shared/services/color-scheme.service';
import { ColorSchemeIconComponent } from '../color-scheme-icon/color-scheme-icon.component';
import { UtilsService } from '@shared/services/utils.service';

@Component({
  selector: 'app-color-scheme-side-menu',
  standalone: true,
  imports: [AsyncPipe, ColorSchemeIconComponent],
  template: `
    <li>
      <a class="flex items-start">
        <span> Color Scheme </span>
      </a>
      <ul class="flex">
        @for(color of colorSchemeService.schemes; track color){
        <li
          (click)="colorSchemeService.selectSchemeCallback($event)"
          [attr.data-scheme]="color"
          [class]="
            utils.cn('my-2 rounded-lg', {
              'bg-base-content/20':
                color === (colorSchemeService.getColorScheme() | async)
            })
          "
        >
          <a
            class="tooltip text-sm"
            [attr.data-tip]="utils.getColorSchemeDetails(color).toolTip"
          >
            <color-scheme-icon [colorScheme]="color"></color-scheme-icon>
          </a>
        </li>

        }
      </ul>
    </li>
  `,
  styles: `
    :host {
      display: contents
    }
  `,
})
export class ColorSchemeSideMenuComponent {
  constructor(
    public utils: UtilsService,
    public colorSchemeService: ColorSchemeService
  ) {}
}
