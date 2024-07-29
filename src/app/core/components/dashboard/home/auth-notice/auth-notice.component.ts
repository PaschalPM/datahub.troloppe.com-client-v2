
import { Component } from '@angular/core';
import { MyMatIconComponent } from '@shared/components/my-mat-icon/my-mat-icon.component';
import { CommonModule } from '@angular/common';
import { PermissionService } from '@shared/services/permission.service';


@Component({
  selector: 'dashboard-home-auth-notice',
  standalone: true,
  imports: [MyMatIconComponent, CommonModule],
  template: `
    <div
      class="flex gap-2 rounded-lg p-2 bg-base-200 text-sm  shadow-md backdrop-blur-md md:items-center"
    >
      <my-mat-icon class="shrink-0 text-secondary">
        help
      </my-mat-icon>
      @if(isAdmin){
      <ng-container *ngTemplateOutlet="admin"></ng-container>
      } @else if (isResearchManager) {
      <ng-container *ngTemplateOutlet="researchManager"></ng-container>
      } @else {
      <ng-container *ngTemplateOutlet="researchStaff"></ng-container>

      }
    </div>

    <ng-template #admin>
      <div class="brightness-50 dark:brightness-75">
        as <span class="font-semibold"> the admin</span>, you have unrestricted
        access.
      </div>
    </ng-template>

    <ng-template #researchManager>
      <div class="brightness-50 dark:brightness-75">
        as a <span class="font-semibold"> research manager</span> you can view,
        create, update, delete and
        <span class="cursor-pointer text-dodger-blue dark:text-orange-400"
          >verify data
        </span>
      </div>
    </ng-template>

    <ng-template #researchStaff>
      <div class="brightness-75">
        as a <span class="font-semibold"> research staff</span> you can view and
        create data, but only update and delete your
        <span class="cursor-pointer text-secondary"
          >unverified data
        </span>
      </div>
    </ng-template>
  `,
})
export class AuthNoticeComponent {
  isAdmin = false;
  isResearchManager = false;

  constructor(private permission: PermissionService) { }

  ngOnInit(): void {
    this.setPermissions()
  }

  private setPermissions() {
    this.isAdmin = this.permission.isAdmin
    this.isResearchManager = this.permission.isResearchManager
  }
}
