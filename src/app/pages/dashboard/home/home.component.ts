import { Component } from '@angular/core';
import { StreetDataOverviewComponent } from '@core/components/dashboard/home/street-data-overview/street-data-overview.component';
import { AuthNoticeComponent } from '@core/components/dashboard/home/auth-notice/auth-notice.component';
import { PaneNavigatorPanelComponent } from '@core/components/dashboard/pane-navigator-panel/pane-navigator-panel.component';
import { routeFadeInOut, visibleTrigger } from '@shared/animations';
import { ExternalListingsOverviewComponent } from "../../../core/components/dashboard/home/external-listings-overview/external-listings-overview.component";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'dashboard-home',
  standalone: true,
  imports: [
    AuthNoticeComponent,
    PaneNavigatorPanelComponent,
    StreetDataOverviewComponent,
    ExternalListingsOverviewComponent
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

  constructor(private readonly router: Router, private readonly activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    const queryParamMap = this.activatedRoute.snapshot.queryParamMap
    const overviewQuery = queryParamMap.get('overview')
    const panes = this.tabs.map((v) => v.pane)


    if (overviewQuery && panes.includes(overviewQuery)) {
      this.activePane = overviewQuery as any
    }
    else {
      this.activePane = 'street-data'
    }
  }

  setActivePane(event: any) {
    this.router.navigateByUrl(`/dashboard?overview=${event}`)
    this.activePane = event
  }
}
