import { Component } from '@angular/core';
import { OverviewComponent } from "../overview/overview.component";
import { ExternalListingsService } from '@core/services/dashboard/external-listings.service';
import { SpinnerComponent } from "../../../../../shared/components/spinner/spinner.component";
import { ChartComponent } from "../chart/chart.component";
import { ChartContainerComponent } from "../chart-container/chart-container.component";

@Component({
  selector: 'dashboard-external-listings-overview',
  standalone: true,
  imports: [OverviewComponent, SpinnerComponent, ChartComponent, ChartContainerComponent],
  templateUrl: './external-listings-overview.component.html',
  styleUrl: './external-listings-overview.component.scss'
})
export class ExternalListingsOverviewComponent {
  sectorsChart!: Array<NameAndValueType>;
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

  constructor(private readonly externalListingsService: ExternalListingsService) {

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
    this.externalListingsService.apiGetOverviewVisualSet().subscribe((v) => {
      this.sectorsChart = v
      this.isLoadingVisualSet = false
    })
  }

  getAgentPerformanceData(){
    this.externalListingsService.apiGetOverviewAgentPerformance().subscribe((v) => {
      console.log(v)
      this.agentPerformanceChart = v
      this.isLoadingAgentPerformance = false
    })
  }
}
