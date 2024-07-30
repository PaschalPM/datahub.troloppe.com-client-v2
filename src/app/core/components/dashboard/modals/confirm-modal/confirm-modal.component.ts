import { Component, Input } from '@angular/core';
import { MyMatIconComponent } from '@shared/components/my-mat-icon/my-mat-icon.component';
import { TextButtonComponent } from '../../text-btn/text-btn.component';
import { ModalService } from '@shared/services/modal.service';
import { UtilsService } from '@shared/services/utils.service';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [MyMatIconComponent, TextButtonComponent],
  template: ` <div
    class="space-y-6 -mt-4 text-center"
  >
    <div class="text-center">
  
      <my-mat-icon
        [clx]="
          utils.cn('text-6xl', {
            'text-error': severity === 'error',
            'text-secondary': severity === 'warning',
          })
        "
      >
        {{ matIconName }}
      </my-mat-icon>
    </div>
    <h1
      [class]="
        utils.cn('text-xl font-medium text-error', {
          'mixin/error': severity === 'error',
          'mixin/warning': severity === 'warning',
        })
      "
    >
      {{ title }}
    </h1>
    <p>{{ message }}</p>
    <div class="text-center flex justify-center">
      <text-button text="Yes" (clickEvent)="onOk()"> </text-button>
    </div>
  </div>`,
})
export class ConfirmModalComponent {
  @Input({ required: true }) matIconName!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) message!: string;
  @Input({ required: true }) ok!: () => void;

  @Input() severity: 'error' | 'warning' = 'error';

  constructor(private modalService: ModalService, public utils: UtilsService) {}

  onOk() {
    this.ok();
    this.modalService.close();
  }
}
