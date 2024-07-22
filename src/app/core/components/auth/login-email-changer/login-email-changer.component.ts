import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UtilsService } from '@shared/services/utils.service';

@Component({
  selector: 'auth-login-email-changer',
  standalone: true,
  imports: [],
  template: `<div class="w-fit" [class]="class">
    <div
      class="relative z-10 inline-flex w-fit items-center gap-4 rounded-sm border p-3 py-2 font-medium"
    >
      @if(email.length > 30) {
      <div class="tooltip" [attr.data-tip]="control.value">
        <span class="text-sm lg:text-base cursor-default">
          {{ utils.truncate(email, 27) }}
        </span>
      </div>
      } @else {
      <span class="text-sm lg:text-base cursor-default">
        {{ email }}
      </span>
      }
      <button
        type="button"
        (click)="emitClickEvent($event)"
        class="text-sm text-info"
      >
        Change
      </button>
    </div>
  </div>`,
})
export class LoginEmailChangerComponent {
  @Input({ required: true }) control!: FormControl;
  @Input() class = '';
  @Output() changeBtnClick = new EventEmitter<Event>();

  email!: string;

  constructor(protected utils: UtilsService) {}

  ngOnInit(): void {
    this.email = this.control.value as string;
  }

  emitClickEvent(event: Event) {
    this.changeBtnClick.emit(event);
  }
}
