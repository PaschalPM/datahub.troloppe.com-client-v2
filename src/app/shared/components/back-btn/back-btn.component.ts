import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { MyMatIconComponent } from "../my-mat-icon/my-mat-icon.component";

@Component({
  selector: 'app-back-btn',
  standalone: true,
  imports: [MyMatIconComponent],
  template: `<button class="btn btn-ghost" (click)="location.back()">
    <my-mat-icon>arrow_back_ios</my-mat-icon>
  </button>`,
})
export class BackBtnComponent {
  constructor(protected location: Location){}
}
