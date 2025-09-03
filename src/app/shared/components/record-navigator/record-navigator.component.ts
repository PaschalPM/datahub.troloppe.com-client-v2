import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MyMatIconComponent } from "../my-mat-icon/my-mat-icon.component";
import { RouterService } from '@core/services/router.service';

@Component({
  selector: 'app-record-navigator',
  standalone: true,
  imports: [MyMatIconComponent],
  template: `
  <div>
    <button class="btn btn-ghost" title="Previous Record" [disabled]="hasPrevious === false" (click)="previousClicked.emit(previousRecordId)">
      <my-mat-icon>arrow_back</my-mat-icon>
    </button>
    <button class="btn btn-ghost" title="Next Record" [disabled]="hasNext === false" (click)="nextClicked.emit(nextRecordId)">
      <my-mat-icon>arrow_forward</my-mat-icon>
    </button>
  </div>
  `,
})
export class RecordNavigatorComponent {
  @Input({ required: true }) previousRecordId: number | null = null;
  @Input({ required: true }) nextRecordId: number | null = null;

  @Output() previousClicked = new EventEmitter();
  @Output() nextClicked = new EventEmitter();

  get hasPrevious(): boolean {
    return this.previousRecordId !== null;
  }

  get hasNext(): boolean {
    return this.nextRecordId !== null;
  }
}
