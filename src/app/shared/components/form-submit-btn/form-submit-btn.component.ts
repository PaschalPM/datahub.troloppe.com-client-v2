import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-submit-btn',
  standalone: true,
  imports: [NgIf],
  template: `
    <div class="text-center">
      <button
        *ngIf="!loading"
        class="btn w-full px-6 btn-info rounded-md mt-3 text-base-100"
      >
        {{ text }}
      </button>
      <button
        *ngIf="loading"
        class="btn btn-info btn-circle mt-3"
        type="button"
      >
        <span class="loading loading-spinner text-base-100"></span>
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
}
