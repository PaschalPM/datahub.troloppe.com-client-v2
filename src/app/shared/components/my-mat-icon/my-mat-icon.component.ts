import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'my-mat-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-template #projected>
      <ng-content />
    </ng-template>
    <i class="material-icons">
      <ng-container *ngTemplateOutlet="projected" />
    </i>
  `,
  styles: `
    :host{
      display: contents;
    }
  `,
})
export class MyMatIconComponent {}
