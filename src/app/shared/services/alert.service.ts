import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alertEvent = new EventEmitter<{
    title: string,
    text: string;
    severity: AlertSeverityType;
  }>();

  constructor() {}

  success(title: string, text: string) {
    this.open(title, text, 'success');
  }

  error(title: string, text: string) {
    this.open(title, text, 'error');
  }

  private open(title: string, text: string, severity: AlertSeverityType = 'success') {
    this.alertEvent.emit({ title, text, severity });
  }
}
