import { Component, ElementRef, ViewChild } from '@angular/core';
import { UtilsService } from '@shared/services/utils.service';
import { MyMatIconComponent } from '../my-mat-icon/my-mat-icon.component';

@Component({
  selector: 'app-color-scheme',
  standalone: true,
  imports: [MyMatIconComponent],
  template: `<ul class="menu rounded-box w-fit">
    <li>
      <details close #details>
        <summary>C</summary>
        <ul class="absolute bg-base-200 p-2 mt-1 right-0 top-10">
          @for(color of schemes; track color){
          <li (click)="onSelectScheme()" class="my-2">
            <a>
              <my-mat-icon
                >{{ utils.getColorSchemeMatIconName(color) }}
              </my-mat-icon>
              {{ utils.capitalize(color) }}</a
            >
          </li>
          }
        </ul>
      </details>
    </li>
  </ul>`,
})
export class ColorSchemeComponent {
  @ViewChild('details') details!: ElementRef;
  selectedScheme!: ColorSchemeType;
  schemes = ['auto', 'light', 'dark'];

  constructor(public utils: UtilsService) {}

  onSelectScheme() {
    (this.details.nativeElement as HTMLElement).removeAttribute('open');
  }
}
