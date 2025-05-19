import { Component } from '@angular/core';
import { TextButtonComponent } from './text-btn/text-btn.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription, Observable, map } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ColorSchemeService } from '@shared/services/color-scheme.service';
import { DownloadExportComponent } from "./download-export/download-export.component";

@Component({
  selector: 'dashboard-create-and-download-street-data-btns',
  standalone: true,
  imports: [TextButtonComponent, FormsModule, CommonModule, DownloadExportComponent],
  template: `
    <div class="flex items-center">
      <app-download-export
        title="Download Street Data"
        [downloadLink]="streetDataExportLink"
        fileName="street-data"
      />

      <text-button
        withIcon="add"
        [isFlexed]="true"
        (clickEvent)="routeToNewStreetView()"
        text="New Street Data"
      ></text-button>
    </div>

  `,
})
export class CreateAndDownloadStreetDataBtnsComponent {
  streetDataExportLink = '/street-data/export';
  private streetDataExportSubscription!: Subscription;

  showDownloadOptions = false;
  startDate: string | null = null;
  endDate: string | null = null;
  isDarkMode$!: Observable<boolean>;
  isDownloadingWithoutDates = false;
  isDownloadingWithDates = false;

  constructor(
    private router: Router,
    private colorSchemeService: ColorSchemeService,
  ) { }

  ngOnInit(): void {
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

}
