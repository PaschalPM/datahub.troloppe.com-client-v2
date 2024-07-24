import { Component } from '@angular/core';
import { AlertService } from '@shared/services/alert.service';
import { AlertComponent as Alert } from '@shared/components/alert/alert.component';
import { alertTrigger } from '@shared/animations';
@Component({
  selector: 'app-alert-provider',
  standalone: true,
  imports: [Alert],
  template: `<div class="app-provider">
    @if(text) {
    <div @alertTrigger>
      <app-alert [text]="text" [severity]="severity"></app-alert>
    </div>
    }
  </div>`,
  animations: [alertTrigger],
})
export class AlertComponent {
  protected text!: string;
  protected severity!: AlertSeverityType;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService.alertEvent.subscribe(({ text, severity }) => {
      this.text = text;
      this.severity = severity;
      setTimeout(() => {
        this.text = '';
      }, 3000);
    });
  }
}