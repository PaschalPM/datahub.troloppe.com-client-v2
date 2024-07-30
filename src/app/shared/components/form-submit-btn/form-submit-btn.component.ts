import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';
import { UtilsService } from '@shared/services/utils.service';

@Component({
  selector: 'app-form-submit-btn',
  standalone: true,
  imports: [NgIf, SpinnerComponent],
  template: `
    <div [class]="utils.cn({'text-left': forDashboard, 'text-center': !forDashboard})">
      <button
        *ngIf="!loading"
        [class]="utils.cn('btn px-6 rounded-md mt-3 text-base-100', {'btn-secondary': forDashboard, 'btn-info  w-full': !forDashboard})"
      >
        {{ text }}
      </button>
      <button
        *ngIf="loading"
        [class]="utils.cn('btn  btn-circle mt-3', {'btn-secondary': forDashboard, 'btn-info': !forDashboard})"
        type="button"
      >
      <app-spinner clx='text-base-100'></app-spinner>
      </button>
    </div>
  `,
  styles: `
    :host {
      display: contents
    }
  `,
})
export class FormSubmitBtnComponent {
  @Input({ required: true }) text!: string;
  @Input() loading = false;
  @Input() forDashboard = false;

  constructor(protected utils: UtilsService) { }
}
