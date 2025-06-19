import { Component } from '@angular/core';
import { routeFadeInOut, visibleTrigger } from '@shared/animations';
import { InvestmentDataFormComponent } from '@core/components/dashboard/investment-data-form/investment-data-form.component';


@Component({
  selector: 'app-new',
  standalone: true,
  imports: [InvestmentDataFormComponent],
  template: `<app-investment-data-form></app-investment-data-form>`,
  animations: [routeFadeInOut, visibleTrigger],
  host: {
    '[@routeFadeInOut]': 'true',
    '[style.display]': 'contents',
  },
})
export class NewComponent {

}
