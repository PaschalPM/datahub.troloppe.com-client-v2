import { Component } from '@angular/core';
import { TextButtonComponent } from '../../dashboard/text-btn/text-btn.component';
import { MyMatIconComponent } from '@shared/components/my-mat-icon/my-mat-icon.component';
import { Router } from '@angular/router';
import { PermissionService } from '@shared/services/permission.service';
import { UserRoles } from '@shared/enums/user-roles';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { BASEURL } from '@configs/global';

@Component({
  selector: 'dashboard-create-and-download-street-data-btns',
  standalone: true,
  imports: [TextButtonComponent, MyMatIconComponent, NgIf],
  template: `<div class="flex items-center">
    <div class="tooltip" data-tip="Download Street Data (xlsx)">
      <a
        *ngIf="isPermitted"
        class="btn btn-ghost btn-sm"
        [attr.href]="streetDataExportLink"
      >
        <my-mat-icon> download</my-mat-icon>
      </a>
    </div>
    <text-button
      withIcon="add"
      [isFlexed]="true"
      (clickEvent)="routeToNewStreetView()"
      text="New Street Data"
    ></text-button>
    
  </div>`,
})
export class CreateAndDownloadStreetDataBtnsComponent {
  isPermitted = false;
  streetDataExportLink = BASEURL + '/street-data/export';
  private streetDataExportSubscription!: Subscription;

  constructor(
    private router: Router,
    private permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.setPermission();
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
}
