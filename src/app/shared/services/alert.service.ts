import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alertEvent = new EventEmitter<{
    title: string,
    text: string;
    severity: AlertSeverityType;
    duration: number
  }>();

  constructor() {}

  success(title: string, text: string, duration = 3000) {
    this.open(title, text, 'success', duration);
  }

  error(title: string, text: string, duration = 3000) {
    this.open(title, text, 'error', duration);
  }

  private open(title: string, text: string, severity: AlertSeverityType = 'success', duration = 3000) {
    this.alertEvent.emit({ title, text, severity, duration });
  }
}
