import { Component } from '@angular/core';
import { TextButtonComponent } from '../../text-btn/text-btn.component';
import { ModalService } from '@shared/services/modal.service';
import { GeolocationService } from '@core/dashboard/geolocation.service';

@Component({
  selector: 'geolocation-alert-modal',
  standalone: true,
  imports: [TextButtonComponent],
  template: `
    <div class="space-y-6">
      <h1 class="text-2xl font-medium">Enable Geolocation</h1>
      <div class="mt-1  w-full font-normal">
        <p>
          Geolocation is disabled. Please enable geolocation to use this form
          effectively. Learn how to enable geolocation here:
          <a
            href="https://www.wikihow.com/Enable-Location-Services-on-Google-Chrome"
            target="_blank"
            class="text-dodger-blue hover:text-dodger-blue/70 text-secondary"
          >
            www.wikihow.com
          </a> or contact your IT Department.
        </p>
      </div>
      <div class="flex justify-end">
        <text-button text="ok" (clickEvent)="onOk()"></text-button>
      </div>
    </div>
  `,
})
export class GeolocationAlertModalComponent {
  constructor(
    private modalService: ModalService,
    private geo: GeolocationService
  ) {}

  onOk() {
    this.geo.displayPopupIfAble();
    this.modalService.close();
  }
}
