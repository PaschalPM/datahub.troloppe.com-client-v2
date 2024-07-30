import { Component, Input } from '@angular/core';
import { UtilsService } from '@shared/services/utils.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
})
export class AlertComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) text!: string;
  @Input() severity: AlertSeverityType = 'success';

  get alertDetails() {
    return this.alertMap[this.severity];
  }

  private alertMap: Record<
    'success' | 'error',
    { clx: string; svgPath: string }
  > = {
    success: {
      clx: 'alert-success',
      svgPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    error: {
      clx: 'alert-error',
      svgPath:
        'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
    },
  };

  constructor(public utils: UtilsService) {}
}
