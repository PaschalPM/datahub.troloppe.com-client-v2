import { Component } from '@angular/core';
import { TextButtonComponent } from './text-btn/text-btn.component';
import { MyMatIconComponent } from '@shared/components/my-mat-icon/my-mat-icon.component';
import { Router } from '@angular/router';
import { PermissionService } from '@shared/services/permission.service';
import { UserRoles } from '@shared/enums/user-roles';
import { NgIf, NgClass, AsyncPipe, CommonModule } from '@angular/common';
import { Subscription, Observable, map } from 'rxjs';
import { BASEURL } from '@configs/global';
import { FormsModule } from '@angular/forms';
import { ColorSchemeService } from '@shared/services/color-scheme.service';

@Component({
  selector: 'dashboard-create-and-download-street-data-btns',
  standalone: true,
  imports: [TextButtonComponent, MyMatIconComponent, NgIf, FormsModule, NgClass, CommonModule, AsyncPipe],
  template: `
    <div class="flex items-center">
      <div class="tooltip" data-tip="Download Street Data (xlsx)">
        <button
          *ngIf="isPermitted"
          class="btn btn-ghost btn-sm"
          (click)="openDownloadOptions()"
        >
          <my-mat-icon>download</my-mat-icon>
        </button>
      </div>

      <text-button
        withIcon="add"
        [isFlexed]="true"
        (clickEvent)="routeToNewStreetView()"
        text="New Street Data"
      ></text-button>
    </div>

    <!-- Download Options Modal -->
    <div
      *ngIf="showDownloadOptions"
      class="fixed inset-0 flex items-center justify-center z-[9999]"
      [ngClass]="{
        'bg-black bg-opacity-50': !(isDarkMode$ | async),
        'bg-gray-900 bg-opacity-70': isDarkMode$ | async
      }"
    >
      <div
        class="p-6 rounded shadow-lg w-96"
        [ngClass]="{
          'bg-white text-black': !(isDarkMode$ | async),
          'bg-gray-800 text-white': isDarkMode$ | async
        }"
      >
        <h2 class="text-xl font-bold mb-4">Download Street Data</h2>

        <div class="flex flex-col gap-2">
          <button
            class="btn btn-primary bg-[#CC924E] text-white hover:bg-[#B67F42] border-none"
            (click)="downloadWithoutDates()"
          >
            Download All Data
          </button>

          <div class="mt-4">
            <label class="block mb-1">Start Date</label>
            <input
              type="date"
              [(ngModel)]="startDate"
              class="input input-bordered w-full"
            />

            <label class="block mt-3 mb-1">End Date</label>
            <input
              type="date"
              [(ngModel)]="endDate"
              class="input input-bordered w-full"
            />

            <button
              class="btn btn-success bg-[#CC924E] text-white hover:bg-[#B67F42] border-none mt-4 w-full"
              (click)="downloadWithDates()"
              [disabled]="!startDate || !endDate"
            >
              Download Data With Dates
            </button>
          </div>
        </div>

        <button
          class="btn btn-ghost mt-4 w-full"
          (click)="closeDownloadOptions()"
        >
          Cancel
        </button>
      </div>
    </div>
  `,
})
export class CreateAndDownloadStreetDataBtnsComponent {
  isPermitted = false;
  streetDataExportLink = BASEURL + '/street-data/export';
  private streetDataExportSubscription!: Subscription;

  showDownloadOptions = false;
  startDate: string | null = null;
  endDate: string | null = null;
  isDarkMode$!: Observable<boolean>;

  constructor(
    private router: Router,
    private permissionService: PermissionService,
    private colorSchemeService: ColorSchemeService
  ) {}

  ngOnInit(): void {
    this.setPermission();
    this.isDarkMode$ = this.colorSchemeService.getActualColorScheme().pipe(
      map((mode) => mode === 'dark')
    );
  }

  routeToNewStreetView() {
    this.router.navigateByUrl('/dashboard/street-data/new');
  }

  ngOnDestroy(): void {
    if (this.streetDataExportSubscription)
      this.streetDataExportSubscription.unsubscribe();
  }

  private setPermission() {
    this.isPermitted = this.permissionService.isPermitted([
      UserRoles.Admin,
      UserRoles.ResearchManager,
    ]);
  }

  openDownloadOptions() {
    this.showDownloadOptions = true;
    document.body.style.overflow = 'hidden'; // Disable scroll
  }

  closeDownloadOptions() {
    this.showDownloadOptions = false;
    this.startDate = null;
    this.endDate = null;
    document.body.style.overflow = ''; // Enable scroll back
  }

  downloadWithoutDates() {
    window.open(this.streetDataExportLink, '_blank');
    this.closeDownloadOptions();
  }

  downloadWithDates() {
    if (!this.startDate || !this.endDate) {
      alert('Please select both start and end dates');
      return;
    }

    const url = `${this.streetDataExportLink}?startDate=${this.startDate}&endDate=${this.endDate}`;
    window.open(url, '_blank');
    this.closeDownloadOptions();
  }
}
