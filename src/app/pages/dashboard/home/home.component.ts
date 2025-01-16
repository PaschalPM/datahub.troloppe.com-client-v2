import { Component } from '@angular/core';
import { StreetDataOverviewComponent } from '@core/components/dashboard/home/street-data-overview/street-data-overview.component';
import { AuthNoticeComponent } from '@core/components/dashboard/home/auth-notice/auth-notice.component';
import { PaneNavigatorPanelComponent } from '@core/components/dashboard/pane-navigator-panel/pane-navigator-panel.component';
import { routeFadeInOut, visibleTrigger } from '@shared/animations';

@Component({
  selector: 'dashboard-home',
  standalone: true,
  imports: [
    AuthNoticeComponent,
    PaneNavigatorPanelComponent,
    StreetDataOverviewComponent,
  ],
  templateUrl: './home.component.html',
  animations: [visibleTrigger, routeFadeInOut],
  host: {
    '[@routeFadeInOut]': 'true',
    '[style.display]': 'contents',
  },
})
export class HomeComponent {
  activePane: 'street-data' | 'investment-data' | 'external-listings' = 'street-data';
  tabs = [
    {
      pane: 'street-data',
      tabLabel: `Street Data`,
    },
    {
      pane: 'external-listings',
      tabLabel: `External Listings`,
    },
    {
      pane: 'investment-data',
      tabLabel: `Investment Data`,
    },
  ];
}
