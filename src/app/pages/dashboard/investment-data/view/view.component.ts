// investment-view.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TextButtonComponent } from '@core/components/dashboard/text-btn/text-btn.component';
import { DummyInvestmentDataService, DummyInvestmentData } from '@core/services/dashboard/dummy-investment-data.service';
import { RouterService } from '@core/services/router.service';
import { LoaderService } from '@shared/services/loader.service';
import { Subject, takeUntil } from 'rxjs';
import { BackBtnComponent } from "../../../../shared/components/back-btn/back-btn.component";
import { SpinnerComponent } from "../../../../shared/components/spinner/spinner.component";
import { PermissionService } from '@shared/services/permission.service';
import { NgIf, NgFor, TitleCasePipe } from '@angular/common';
import { InvestmentDataService } from '@core/services/dashboard/investment-data.service';

@Component({
  selector: 'app-investment-view',
  standalone: true,
  imports: [TextButtonComponent, BackBtnComponent, SpinnerComponent],
  templateUrl: 'view.component.html',
  styleUrl: 'view.component.scss'
})
export class ViewComponent implements OnInit, OnDestroy {
  public Object = Object;
  investmentData: DummyInvestmentData | null = null;
  sector: string = '';
  private destroy$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: RouterService,
    private readonly investmentDataService: InvestmentDataService,
    private readonly loaderService: LoaderService,
    public readonly permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.sector = this.route.snapshot.paramMap.get('sector') || 'residential';
    
    const storedData = this.router.getState(`/dashboard/investment-data/${this.sector}/${id}`);

    if (storedData) {
      this.investmentData = storedData;
    } else {
      this.fetchInvestmentData(+id!);
    }
  }

  private fetchInvestmentData(id: number): void {
    this.loaderService.start();
    
   
    this.investmentDataService.apiGetInvestmentDataById(id, true, this.sector)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.investmentData = response.data.find((item: DummyInvestmentData) => item.id === id);
          if (!this.investmentData) {
            this.router.navigateByUrl('/not-found');
          }
        },
        error: () => {
          this.router.navigateByUrl('/not-found');
        },
        complete: () => {
          this.loaderService.stop();
        }
      });
  }

  // Get filtered keys for display (exclude certain fields)
  get investmentDataKeys(): string[] {
    if (!this.investmentData) return [];
    
    const excludedKeys = ['id', 'Updated By']; // Add more keys to exclude if needed
    return Object.keys(this.investmentData).filter(key => !excludedKeys.includes(key));
  }

  

  // Get grouped data for better organization
  get groupedData(): { [category: string]: { [key: string]: any } } {
    if (!this.investmentData) return {};
    
    const basicInfo: { [key: string]: any } = {};
    const locationInfo: { [key: string]: any } = {};
    const propertyDetails: { [key: string]: any } = {};
    const financialInfo: { [key: string]: any } = {};
    const contactInfo: { [key: string]: any } = {};
    const otherInfo: { [key: string]: any } = {};

    const locationKeys = ['State', 'Region', 'Locality', 'Section', 'L.G.A', 'L.C.D.A', 'Street Name'];
    const propertyKeys = ['Building Type', 'Classification', 'No of Units', 'No of Beds', 'No of Floors', 'Land Area', 'NLFA', 'Number of Keys', 'No of Seats', 'No of Bay', 'No of Plots', 'No of Streets'];
    const financialKeys = ['Rental Price', 'Sale Price', 'Daily Rate', 'Daily Rates', 'Annual Service Charge'];
    const contactKeys = ['Contact Name', 'Contact Number'];
    const basicKeys = ['Date', 'Status', 'Completion Year', 'Period'];

    Object.keys(this.investmentData).forEach(key => {
      if (key === 'id' || key === 'Updated By') return;
      
      const value = this.investmentData![key];
      
      if (locationKeys.includes(key)) {
        locationInfo[key] = value;
      } else if (propertyKeys.includes(key)) {
        propertyDetails[key] = value;
      } else if (financialKeys.includes(key)) {
        financialInfo[key] = value;
      } else if (contactKeys.includes(key)) {
        contactInfo[key] = value;
      } else if (basicKeys.includes(key)) {
        basicInfo[key] = value;
      } else {
        otherInfo[key] = value;
      }
    });

    const result: { [category: string]: { [key: string]: any } } = {};
    
    if (Object.keys(basicInfo).length) result['Basic Information'] = basicInfo;
    if (Object.keys(locationInfo).length) result['Location Details'] = locationInfo;
    if (Object.keys(propertyDetails).length) result['Property Details'] = propertyDetails;
    if (Object.keys(financialInfo).length) result['Financial Information'] = financialInfo;
    if (Object.keys(contactInfo).length) result['Contact Information'] = contactInfo;
    if (Object.keys(otherInfo).length) result['Additional Information'] = otherInfo;
    
    return result;
  }

  goToEditInvestmentData(): void {
    const id = this.investmentData?.id;
    this.router.navigateByUrl(`/dashboard/investment-data/${this.sector}/${id}/edit`);
  }

  deleteInvestmentData(): void {
    const id = this.investmentData?.id;
    // Implement delete functionality here
    console.log(`Delete investment data with ID: ${id} from sector: ${this.sector}`);
    // You can show a confirmation dialog and then navigate back to the list
  }

  formatKey(key: string): string {
    // Convert keys like 'L.G.A' to more readable format
    if (key === 'L.G.A') return 'Local Government Area';
    if (key === 'L.C.D.A') return 'Local Council Development Area';
    if (key === 'NLFA') return 'Net Lettable Floor Area';
    
    // Convert camelCase or PascalCase to readable format
    return key.replace(/([A-Z])/g, ' $1').trim();
  }

  getSectorDisplayName(): string {
    return this.sector.charAt(0).toUpperCase() + this.sector.slice(1);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}