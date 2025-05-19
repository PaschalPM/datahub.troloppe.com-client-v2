import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExportExcelService } from '@core/services/dashboard/export-excel.service';
import { MyMatIconComponent } from '@shared/components/my-mat-icon/my-mat-icon.component';
import { SpinnerComponent } from '@shared/components/spinner/spinner.component';
import { UserRoles } from '@shared/enums/user-roles';
import { ColorSchemeService } from '@shared/services/color-scheme.service';
import { PermissionService } from '@shared/services/permission.service';
import { map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-download-export',
  standalone: true,
  imports: [CommonModule, MyMatIconComponent, FormsModule, SpinnerComponent],
  templateUrl: './download-export.component.html',
  styleUrl: './download-export.component.scss'
})
export class DownloadExportComponent {
  @Input() downloadLink!: string;
  @Input() fileName!: string;
  @Input() title!: string;
  isPermitted = false;
  private streetDataExportSubscription!: Subscription;

  showDownloadOptions = false;
  startDate: string | null = null;
  endDate: string | null = null;
  isDarkMode$!: Observable<boolean>;
  isDownloadingWithoutDates = false;
  isDownloadingWithDates = false;

  constructor(
    private permissionService: PermissionService,
    private colorSchemeService: ColorSchemeService,
    private readonly exportExcelService: ExportExcelService
  ) { }

  ngOnInit(): void {
    this.setPermission();
    this.isDarkMode$ = this.colorSchemeService.getActualColorScheme().pipe(
      map((mode) => mode === 'dark')
    );
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
    this.isDownloadingWithoutDates = true;
    this.exportExcelService.downloadExcelFile(this.downloadLink, this.fileName, () => {
      this.isDownloadingWithoutDates = false;
      this.closeDownloadOptions()
    }
    )
  }

  downloadWithDates() {
    if (!this.startDate || !this.endDate) {
      alert('Please select both start and end dates');
      return;
    }

    this.isDownloadingWithDates = true;
    this.exportExcelService.downloadExcelFile(this.downloadLink, `${this.fileName}-(${this.startDate}_${this.endDate})`, () => {
      this.isDownloadingWithDates = false;
      this.closeDownloadOptions()
    }, { startDate: this.startDate, endDate: this.endDate }
    )
  }
}
