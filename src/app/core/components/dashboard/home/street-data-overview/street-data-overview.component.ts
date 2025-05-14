import { Component } from '@angular/core';
import { OverviewComponent } from '../overview/overview.component';
import { ChartComponent } from '../chart/chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartContainerComponent } from '../chart-container/chart-container.component';
import { UserRoles } from '@shared/enums/user-roles';
import { PermissionService } from '@shared/services/permission.service';
import { ActiveLocationIndicatorComponent } from '../active-location-indicator/active-location-indicator.component';
import { RouterModule } from '@angular/router';
import { TextButtonComponent } from '../../text-btn/text-btn.component';
import { OverviewService } from '@core/services/dashboard/overview.service';
import { UtilsService } from '@shared/services/utils.service';
import { SpinnerComponent } from "@shared/components/spinner/spinner.component";
import { MyMatIconComponent } from "@shared/components/my-mat-icon/my-mat-icon.component";
import { CreateAndDownloadStreetDataBtnsComponent } from '../../create-and-download-street-data-btns.component';

@Component({
  selector: 'dashboard-street-data-overview',
  standalone: true,
  imports: [
    OverviewComponent,
    ChartComponent,
    ChartContainerComponent,
    NgxChartsModule,
    ActiveLocationIndicatorComponent,
    TextButtonComponent,
    RouterModule,
    SpinnerComponent,
    MyMatIconComponent,
    CreateAndDownloadStreetDataBtnsComponent
],
  templateUrl: './street-data-overview.component.html',
})
export class StreetDataOverviewComponent {
  verifiedStreetDataByLocation!: Array<NameAndValueType>;
  verifiedStreetDataBySector!: Array<NameAndValueType>;
  isLoadingVisualSet = true;

  verifiedStreetDataUploadedByStaff!: Array<NameAndValueType>;
  isLoadingUserPerformance = true;

  isPermitted!: boolean;
  allowedToView = [UserRoles.Admin, UserRoles.ResearchManager];

  overviewItems: OverviewWidgetItem[] = [
    {
      id: 1,
      totalSum: 0,
      overviewTitle: 'Total Street Data Collected',
      myMatIcon: 'streetview',
    },
    {
      id: 2,
      totalSum: 0,
      overviewTitle: 'Total Verified Street Data',
      myMatIcon: 'streetview',
    },
    {
      id: 3,
      totalSum: 0,
      overviewTitle: 'My Street Data Collected',
      myMatIcon: 'streetview',
    },
    {
      id: 4,
      totalSum: 0,
      overviewTitle: 'My Verified Street Data',
      myMatIcon: 'streetview',
    },
  ];

  constructor(
    private permission: PermissionService,
    private streetDataOverviewService: OverviewService,
    private utils: UtilsService
  ) {
    this.isPermitted = this.permission.isPermitted(this.allowedToView);
  }

  ngOnInit(): void {
    this.getWidgetOverviewData();
    this.getVisualOverviewData();
    this.getUserPerformanceVisuals();
  }


  getWidgetOverviewData() {
    this.streetDataOverviewService.getWidgetSet().subscribe((value) => {
      if (value) {
        this.overviewItems[0].totalSum = value.total_street_data;
        this.overviewItems[1].totalSum = value.total_verified_street_data;
        this.overviewItems[2].totalSum = value.user_street_data;
        this.overviewItems[3].totalSum = value.user_verified_street_data;
      }
    });
  }

  getVisualOverviewData() {
    this.streetDataOverviewService.getVisualSet().subscribe((value) => {
      if (value) {
        this.verifiedStreetDataByLocation =
          value!.verified_street_data_by_location;
        this.verifiedStreetDataBySector = value.verified_street_data_by_sector.map((data) => ({
          value: data.value,
          name: this.utils.capitalize(data.name)
        }));
        this.isLoadingVisualSet = false;
      }
    });
  }
  getUserPerformanceVisuals() {
    this.streetDataOverviewService
      .getUserPerformanceVisual()
      .subscribe((value) => {
        if (value) {
          this.verifiedStreetDataUploadedByStaff =
            value.verified_street_data_by_staff;
          this.isLoadingUserPerformance = false;
        }
      });
  }
}
