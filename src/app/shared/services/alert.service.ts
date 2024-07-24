import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alertEvent = new EventEmitter<{
    text: string;
    severity: AlertSeverityType;
  }>();

  constructor() {}

  success(text: string) {
    this.open(text, 'success');
  }

  error(text: string) {
    this.open(text, 'error');
  }

  private open(text: string, severity: AlertSeverityType = 'success') {
    this.alertEvent.emit({ text, severity });
  }
}
