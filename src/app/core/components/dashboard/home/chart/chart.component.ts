import { Component, Input } from '@angular/core';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
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
  colorScheme!: Color

  constructor(
    public colorSchemeService: ColorSchemeService,
    private utils: UtilsService
  ) { }

  getColorScheme(mode: 'light' | 'dark' = 'light'): Color {
    return {
      name: mode === 'dark' ? 'darkCustomScheme' : 'customScheme',   // Unique name
      selectable: true,       // Allows selection
      group: ScaleType.Ordinal,       // Color group type
      domain: mode === 'dark' ? ['#8F2E60', '#8B5D34', '#3D9E73', '#365D8B'] : ['#9c672b', '#cc8e48', '#cc4886', '#4886cc']
    };

  }

  ngOnInit(): void {
    this.capitalizeKeyNamesInResults();
    this.actualColorSchemeSubscription = this.colorSchemeService.getActualColorScheme().subscribe((value) => {
      if (value === 'dark') {
        this.colorScheme = this.getColorScheme('dark')
        this.fillColor = '#8aa1b6'
      }
      else {
        this.colorScheme = this.getColorScheme()
        this.fillColor = '#353e4b'
      }
    })
  }



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
