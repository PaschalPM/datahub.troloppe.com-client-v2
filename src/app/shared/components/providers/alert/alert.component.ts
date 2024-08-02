import { Component } from '@angular/core';
import { AlertService } from '@shared/services/alert.service';
import { AlertComponent as Alert } from '@shared/components/alert/alert.component';
import { alertTrigger } from '@shared/animations';
@Component({
  selector: 'app-alert-provider',
  standalone: true,
  imports: [Alert],
  template: `<div class="fixed z-50 top-0 left-1/2 w-full max-w-2xl -translate-x-1/2">
    @if(text) {
    <div @alertTrigger>
      <app-alert [title]="title" [text]="text" [severity]="severity"></app-alert>
    </div>
    }
  </div>`,
  animations: [alertTrigger],
})
export class AlertComponent {
  protected title!: string;
  protected text!: string;
  protected severity!: AlertSeverityType;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService.alertEvent.subscribe(({ title, text, severity, duration }) => {
      this.title = title;
      this.text = text;
      this.severity = severity;
      setTimeout(() => {
        this.text = '';
      }, duration);
    });
  }
}
