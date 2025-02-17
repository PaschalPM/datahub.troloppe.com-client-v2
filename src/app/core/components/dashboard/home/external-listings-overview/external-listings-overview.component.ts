import { Component } from '@angular/core';
import { OverviewComponent } from "../overview/overview.component";
import { ExternalListingsService } from '@core/services/dashboard/external-listings.service';
import { SpinnerComponent } from "../../../../../shared/components/spinner/spinner.component";
import { ChartComponent } from "../chart/chart.component";
import { ChartContainerComponent } from "../chart-container/chart-container.component";
import { TextButtonComponent } from "../../text-btn/text-btn.component";
import { RouterService } from '@core/services/router.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'dashboard-external-listings-overview',
  standalone: true,
  imports: [OverviewComponent, SpinnerComponent, ChartComponent, ChartContainerComponent, TextButtonComponent],
  templateUrl: './external-listings-overview.component.html',
  styleUrl: './external-listings-overview.component.scss'
})
export class ExternalListingsOverviewComponent {
  sectorsChart!: Array<NameAndValueType>;
  locationsChart!: Array<NameAndValueType>;
  agentPerformanceChart!: Array<NameAndValueType>
  isLoadingVisualSet = true;
  isLoadingAgentPerformance = true
  overviewItems: OverviewWidgetItem[] = [
    {
      id: 1,
      totalSum: 0,
      overviewTitle: 'Total External Listings Collected',
      myMatIcon: 'streetview',
    },
    {
      id: 2,
      totalSum: 0,
      overviewTitle: 'Total States Covered',
      myMatIcon: 'streetview',
    },
    {
      id: 3,
      totalSum: 0,
      overviewTitle: 'Total Sectors Covered',
      myMatIcon: 'streetview',
    },
    {
      id: 4,
      totalSum: 0,
      overviewTitle: 'Total Listing Agents',
      myMatIcon: 'streetview',
    },
  ];

  constructor(
    private readonly externalListingsService: ExternalListingsService,
    private readonly router: RouterService
  ) {

  }

  ngOnInit(): void {
    this.getWidgetSetData()
    this.getVisualOverviewData()
    this.getAgentPerformanceData()
  }

  getWidgetSetData() {

    this.externalListingsService.apiGetOverviewWidgetSet().subscribe({
      next: (v) => {
        this.overviewItems[0].totalSum = v.total_external_listings
        this.overviewItems[1].totalSum = v.total_states_covered
        this.overviewItems[2].totalSum = v.total_sectors_covered
        this.overviewItems[3].totalSum = v.total_listing_agents
      }
    })
  }

  getVisualOverviewData() {
    const sectors$ = this.externalListingsService.apiGetOverviewVisualSet('sectors')
    const top10Locations$ = this.externalListingsService.apiGetOverviewVisualSet('top-10-locations')
    forkJoin([sectors$, top10Locations$]).subscribe((v) => {
      this.sectorsChart = v[0]
      this.locationsChart = v[1]
      this.isLoadingVisualSet = false
    })
    this.externalListingsService.apiGetOverviewVisualSet().subscribe((v) => {
      this.sectorsChart = v
      this.isLoadingVisualSet = false
    })
  }

  getAgentPerformanceData() {
    this.externalListingsService.apiGetOverviewAgentPerformance().subscribe((v) => {
      this.agentPerformanceChart = v
      this.isLoadingAgentPerformance = false
    })
  }

  goToNewListing() {
    this.router.navigateByUrl('/dashboard/external-listings/new')
  }
}
