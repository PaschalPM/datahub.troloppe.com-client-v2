import { Component, OnDestroy } from '@angular/core';
import { BackBtnComponent } from "../../../../../shared/components/back-btn/back-btn.component";
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '@core/services/router.service';
import { LoaderService } from '@shared/services/loader.service';
import { ListingsAgentsService } from '@core/services/dashboard/listings-agents.service';
import { TextButtonComponent } from "../../../../../core/components/dashboard/text-btn/text-btn.component";
import { UtilsService } from '@shared/services/utils.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, RowClickedEvent } from 'ag-grid-community';
import { ColorSchemeService } from '@shared/services/color-scheme.service';
import { SpinnerComponent } from "../../../../../shared/components/spinner/spinner.component";

@Component({
  selector: 'app-show',
  standalone: true,
  imports: [BackBtnComponent, TextButtonComponent, AgGridAngular, SpinnerComponent],
  templateUrl: './show.component.html',
  styleUrl: './show.component.scss'
})
export class ShowComponent implements OnDestroy {
  tableThemeColor: 'dark' | 'light' = 'light';
  listingAgentData: any
  columnDefs: ColDef<any>[] = [
    {
      headerName: 'S/N',
      width: 75,
      valueGetter(params) {
        return params.node?.rowIndex! + 1
      }
    },
    {
      field: "Date"
    },
    { field: "Region" },
    { field: "Location" },
    { field: "Section" },
    { field: "L.G.A" },
    { field: "L.C.D.A" },
    { field: "Street" },
    { field: "Street Number" },
    { field: "Development" },
    { field: "Sector" },
    { field: "Type" },
    { field: "Sub Type" },
    { field: "No of Beds" },
    { field: "Size" },
    { field: "Land Area" },
    { field: "Offer" },
    { field: "Sale Price" },
    { field: "Lease Price" },
    { field: "Price/Sqm" },
    { field: "Service Charge" },
    { field: "Developer" }
  ]
  defaultColDef: ColDef<any> = {
    filter: true,
    width: 175
  }
  totalRecords = '...'
  rowData = []
  private destroy$ = new Subject<void>

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: RouterService,
    private readonly loaderService: LoaderService,
    private readonly listingAgentService: ListingsAgentsService,
    private readonly utils: UtilsService,
    private readonly colorScheme: ColorSchemeService
  ) {

  }

  ngOnInit(): void {
    this.colorScheme
      .getActualColorScheme()
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.tableThemeColor = value;
      });

    const id = this.activatedRoute.snapshot.paramMap.get('id')
    const storedData = this.router.getState(`/dashboard/external-listings/agents/${id}`)

    if (storedData) {
      this.listingAgentData = storedData
      this.apiGetListingAgentById(id!, true)
    }
    else {
      this.loaderService.start()
      this.apiGetListingAgentById(id!)
    }
  }

  // Exclude updated_by_id key
  get listingAgentKeys() {
    return this.listingAgentData && Object.keys(this.listingAgentData)
      .filter((v) => !(['created_at', 'updated_at', 'id', 'listings'].includes(v)))
  }

  getLabel(name: string) {
    return this.utils.capitalize(name)
  }

  goToEditAgent() {
    this.router.navigateByUrl(`/dashboard/external-listings/agents/${this.listingAgentData.id}/edit`, this.listingAgentData)
  }

  onRowClicked(ev: RowClickedEvent) {
    this.router.navigateByUrl(`/dashboard/external-listings/${ev.data.id}`)
  }

  private apiGetListingAgentById(id: string, onlyListings = false) {

    this.listingAgentService.apiGetListingAgentById(+id!, onlyListings)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          if (!onlyListings) {

            this.listingAgentData = value.data
            this.rowData = value.data.listings
          }
          else {
            this.rowData = value.data
          }
          this.totalRecords = this.rowData.length.toString()

          if (!value.success) {
            this.router.navigateByUrl('/not-found')
          }
        },
        complete: () => {
          this.loaderService.stop()
        }
      })
  }
  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
