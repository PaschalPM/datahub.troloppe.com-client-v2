import { Component, Input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ColorSchemeService } from '@shared/services/color-scheme.service';
import { UtilsService } from '@shared/services/utils.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'dashboard-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './chart.component.html',
  styles: `
    :host{
      display:contents;
    }
  `,
})
export class ChartComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) results!: any;
  @Input() type: 'horizontal-bar' | 'vertical-bar' | 'pie' = 'horizontal-bar';

  actualColorSchemeSubscription!: Subscription
  fillColor = '#fff'

  private darkColor = '#a66417'
  private lightColor = '#cc8e48'

  constructor(
    public colorScheme: ColorSchemeService,
    private utils: UtilsService
  ) { }


  ngOnInit(): void {
    this.capitalizeKeyNamesInResults();
    this.actualColorSchemeSubscription = this.colorScheme.getActualColorScheme().subscribe((value) => {
      if (value === 'dark') {
        this.currentColor = () => this.darkColor
        this.fillColor = '#8aa1b6'
      }
      else {
        this.currentColor = () => this.lightColor
        this.fillColor = '#353e4b'

      }
    })
  }


  currentColor: () => string = () => this.lightColor

  ngOnDestroy() {
    this.actualColorSchemeSubscription.unsubscribe()
  }
  private capitalizeKeyNamesInResults() {
    if (this.results instanceof Array) {
      this.results = this.results.map((result) => {
        if ('name' in result) {
          result.name = this.utils.capitalize(result.name);
        }
        return result;
      });
    }
  }
}
