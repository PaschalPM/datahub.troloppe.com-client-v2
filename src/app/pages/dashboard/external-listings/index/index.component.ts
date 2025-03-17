import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TextButtonComponent } from '@core/components/dashboard/text-btn/text-btn.component';
import { ExternalListingsService } from '@core/services/dashboard/external-listings.service';
import { RouterService } from '@core/services/router.service';
import { AuthService } from '@shared/services/auth.service';
import { ColorSchemeService } from '@shared/services/color-scheme.service';
import { PermissionService } from '@shared/services/permission.service';
import { User } from '@shared/services/types';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridOptions } from 'ag-grid-community';
import { Observable, Subject, Subscription, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'external-listing-index',
  standalone: true,
  imports: [TextButtonComponent, AgGridAngular],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnDestroy {
  gridOptions: GridOptions = {
    suppressFieldDotNotation: true, // Treats dot as part of the field name
    rowBuffer: 5,
    getRowId: params => `${params.data.id}`
  };
  rowData!: Observable<any | null>;
  colDefs: ColDef<any>[] = [
    {
      headerName: 'S/N', width: 75, filter: false, field: 'id',
      cellRenderer(params: any) {
        if (!params.value) {
          return 'Loading...'
        }
        return params.node.rowIndex + 1
      }
    },
    {
      field: 'Date',
      sortable: false
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
      filter: false
    },
    {
      field: "L.C.D.A",
      headerName: "L. C. D. A",
      filter: false
    },
    {
      field: "Street",
      filter: false
    },
    {
      field: "Street Number",
      filter: false
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
      width: 250,
      filter: false
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
    filterParams: {
      debounceMs: 500,     // Debounce time for user input
      filterOptions: ['contains']
    },
    autoHeight: false,
    cellClass: '!flex !items-center',
    cellStyle: { 'white-space': 'normal', 'word-wrap': 'break-word', 'height': 'max-content' },
    width: 150,
  };
  tableThemeColor: 'dark' | 'light' = 'light';
  isLoading = true;
  pageSize = 250
  initialRowCount = 0
  datasource: any;
  totalRecords = '...'
  destroy$ = new Subject<void>()
  currentUser!: User

  constructor(
    private els: ExternalListingsService,
    private router: RouterService,
    public colorScheme: ColorSchemeService,
    public permission: PermissionService,
    private authService: AuthService
  ) { }

  ngOnInit() {


    this.authService.onCurrentUser().pipe(takeUntil(this.destroy$)).subscribe((v) => {
      this.currentUser = v!
    })

    const paginatedListingParams: PaginatedListingsParams = {
      limit: 1
    }

    if (!this.permission.isAdmin){
      paginatedListingParams.updatedById = this.currentUser.id
    }

    this.els.getPaginatedExternalListings(paginatedListingParams).pipe(takeUntil(this.destroy$))
      .subscribe(v => {
        this.totalRecords = v!.totalPages.toString()
      })

    this.datasource = {
      getRows: (params: any) => {

        const startRow = params.startRow;
        const currentPage = (Math.floor(startRow / this.pageSize) + 1); // Ensure page calculation works for both up and down scrolls
        const paginatedListingParams: PaginatedListingsParams = {
          limit: this.pageSize,
          currentPage,
        }
        if (Object.keys(params.filterModel).length > 0) {
          paginatedListingParams.agFilterModel = params.filterModel
        }
        if (params.sortModel.length > 0) {
          const sort = params.sortModel[0].sort
          const colId = params.sortModel[0].colId
          const sortBy = `${colId}:${sort}`
          paginatedListingParams.sortBy = sortBy
        }

        if (!this.permission.isAdmin) {
          paginatedListingParams.updatedById = this.currentUser.id
        }

        this.els.getPaginatedExternalListings(paginatedListingParams).pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (value) => {
              params.successCallback(value!.data, value!.totalRecords);
            },
            error() {
              params.failCallback();
            }
          })
      }
    }

    this.colorScheme
      .getActualColorScheme()
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.tableThemeColor = value;
      });
  }

  goToNewListingView() {
    this.router.navigateByUrl('/dashboard/external-listings/new');
  }

  goToViewAgents() {
    this.router.navigateByUrl('/dashboard/external-listings/agents');
  }

  onRowClicked(ev: any) {
    const data = ev.data
    this.router.navigateByUrl(`/dashboard/external-listings/${data.id}`, data)
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
