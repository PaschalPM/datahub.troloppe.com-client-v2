import { Component, Input } from '@angular/core';
import { UtilsService } from '@shared/services/utils.service';
import { MyMatIconComponent } from '../my-mat-icon/my-mat-icon.component';

@Component({
  selector: 'color-scheme-icon',
  standalone: true,
  imports: [MyMatIconComponent],
  template: `
    <my-mat-icon
      >{{ utils.getColorSchemeDetails(colorScheme).matName }}
    </my-mat-icon>
  `,
})
export class ColorSchemeIconComponent {
  @Input() colorScheme: string | null = '';
  constructor(public utils: UtilsService) {}
}
