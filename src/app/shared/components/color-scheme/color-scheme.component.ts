import { Component, Input } from '@angular/core';
import { UtilsService } from '@shared/services/utils.service';
import { MyMatIconComponent } from '../my-mat-icon/my-mat-icon.component';
import { ClickOutsideDirective } from '@shared/directives/click-outside.directive';
import { ColorSchemeService } from '@shared/services/color-scheme.service';
import { Observable, Subscription } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { ColorSchemeIconComponent } from '../color-scheme-icon/color-scheme-icon.component';
import { fadeInOut } from '@shared/animations';

@Component({
  selector: 'app-color-scheme',
  standalone: true,
  imports: [
    MyMatIconComponent,
    ClickOutsideDirective,
    AsyncPipe,
    ColorSchemeIconComponent,
    NgIf,
  ],
  template: `
    <ul [class]="utils.cn('menu rounded-box w-fit', clx)">
      <li>
        <div>
          <button class="pt-1" (click)="isMenuOpen = true">
            <color-scheme-icon
              [colorScheme]="colorSchemeService.getColorScheme() | async"
            ></color-scheme-icon>
          </button>
          <ul
            *ngIf="isMenuOpen"
            appClickOutside
            (clickOutside)="isMenuOpen = false"
            class="absolute bg-base-200 p-2 mt-1 right-0 top-12"
            @fadeInOut
          >
            @for(color of colorSchemeService.schemes; track color){
            <li
              (click)="onSelectScheme($event)"
              [attr.data-scheme]="color"
              [class]="
                utils.cn('my-2 rounded-lg', {
                  'bg-base-content/20': color === (colorSchemeService.getColorScheme() | async)
                })
              "
            >
              <a>
                <color-scheme-icon [colorScheme]="color"></color-scheme-icon>
                {{ utils.capitalize(color) }}
              </a>
            </li>
            }
          </ul>
        </div>
      </li>
    </ul>
  `,
  animations: [fadeInOut],
})
export class ColorSchemeComponent {
  @Input() clx = '';
  isMenuOpen = false;

  constructor(
    public utils: UtilsService,
    public colorSchemeService: ColorSchemeService
  ) {}


  onSelectScheme(event: Event) {
    this.colorSchemeService.selectSchemeCallback(event);
  }
}
