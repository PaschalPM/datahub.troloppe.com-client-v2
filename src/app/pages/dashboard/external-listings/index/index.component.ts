import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TextButtonComponent } from '@core/components/dashboard/text-btn/text-btn.component';
import { ExternalListingsService } from '@core/services/dashboard/external-listings.service.ts.service';
import { ColorSchemeService } from '@shared/services/color-scheme.service';
import { PermissionService } from '@shared/services/permission.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { map, Observable, Subscription, tap } from 'rxjs';

@Component({
  selector: 'external-listing-index',
  standalone: true,
  imports: [TextButtonComponent, AgGridAngular],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  gridOptions = {
    suppressFieldDotNotation: true, // Treats dot as part of the field name
    rowBuffer: 25
  };
  rowData!: Observable<any | null>;
  colDefs: ColDef<any>[] = [
    { headerName: 'S/N', width: 75, valueGetter: 'node.rowIndex + 1' },
    {
      field: 'Date',
    },
    {
      field: 'Region',
    },
    {
      field: 'Location',
    },
    {
      field: 'Section',
    },
    {
      field: "L.G.A",
      headerName: "L. G. A",
    },
    {
      field: "L.C.D.A",
      headerName: "L. C. D. A",
    },
    {
      field: "Street",
    },
    {
      field: "Street Number",
    },
    {
      field: "Development",
    },
    {
      field: "Sector",
    },
    {
      field: "Type",
    },
    {
      field: "Sub Type",
    },
    {
      field: "No of Beds",
    },
    {
      field: "Size",
      cellClass: "text-center",
      headerClass: "text-center"
    },
    {
      field: "Land Area",
      cellClass: "text-center",
      headerClass: "text-center",
    },
    {
      field: "Offer",
    },
    {
      field: "Sale Price",
      cellClass: 'text-right'
    },
    {
      field: "Lease Price",
      cellClass: 'text-right'
    },
    {
      field: "Price/Sqm",
      cellClass: 'text-right'
    },
    {
      field: "Service Charge",
      cellClass: 'text-right'
    },
    {
      field: "Developer",
    },
    {
      field: "Listing Agent",
      width: 250,
    },
    {
      field: "Contact Number",
    },
    {
      field: "E-mail",
      width: 250
    },
    {
      field: "Comment",
      width: 250
    },
    {
      field: "Source",
      width: 200
    },
    {
      field: "Updated By",
      hide: !(this.permission.isAdmin || this.permission.isResearchManager),
    },
  ];
  defaultColDefs: ColDef<any> = {
    sortable: true,
    filter: true,
    autoHeight: true,
    cellClass: '!flex !items-center',
    cellStyle: { 'white-space': 'normal', 'word-wrap': 'break-word', 'height': 'max-content' },
    width: 150
  };
  tableThemeColor: 'dark' | 'light' = 'light';
  isLoading = true;
  pageSize = 50
  initialRowCount = 0
  datasource: any;
  private actualColorSchemeSubscription!: Subscription;

  constructor(
    private els: ExternalListingsService,
    private router: Router,
    public colorScheme: ColorSchemeService,
    private permission: PermissionService,
  ) { }

  ngOnInit() {
    this.datasource = {
      getRows: (params: any) => {

        const startRow = params.startRow;
        const currentPage = Math.floor(startRow / this.pageSize) + 1; // Ensure page calculation works for both up and down scrolls

        this.els.getPaginatedListings({ limit: this.pageSize, currentPage }).pipe(tap(() => {
    
        })).subscribe({
          next: (value) => {
            params.successCallback(value.data, value.totalRecords);
          },
          error() {
            params.failCallback();
          }
        })
      }
    }

    this.actualColorSchemeSubscription = this.colorScheme
      .getActualColorScheme()
      .subscribe((value) => {
        this.tableThemeColor = value;
      });
  }

  routeToNewListingView() {
    this.router.navigateByUrl('/dashboard/external-listings/new');
  }




}
