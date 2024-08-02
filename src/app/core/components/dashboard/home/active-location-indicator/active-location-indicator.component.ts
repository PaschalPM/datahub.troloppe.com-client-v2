import { AsyncPipe, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

import { MyMatIconComponent } from '@shared/components/my-mat-icon/my-mat-icon.component';
import { UtilsService } from '@shared/services/utils.service';
import { ModalService } from '@shared/services/modal.service';

import { ActiveLocationFormModalComponent } from '../../modals/active-location-form-modal/active-location-form-modal.component';
import { ActiveLocationService } from '@core/services/dashboard/active-location.service';
import { PermissionService } from '@shared/services/permission.service';
import { UserRoles } from '@shared/enums/user-roles';
import { map, Observable, Subscription } from 'rxjs';
import { SpinnerComponent } from "@shared/components/spinner/spinner.component";

@Component({
  selector: 'dashboard-active-location-indicator',
  standalone: true,
  imports: [NgIf, AsyncPipe, MyMatIconComponent, SpinnerComponent],
  template: `
    <div
      class="my-6 mixin/base:font-bold mixin/base:font-mono mixin/base:flex mixin/base:items-center mixin/base:gap-2"
    >
      <ng-container
        *ngIf="activeLocation !== undefined; else loading"
      >
      @if(activeLocation){
         <!---: Display Active Location -->
        <div
        [class]="
          utils.cn('inline-flex items-center gap-2', {
            'cursor-pointer': isPermitted && !nonEditable
          })
        "
        (click)="isPermitted && !nonEditable && onOpenFormModal()"
      >
        <div
          class="mixin/base text-success animate-pulse"
        >
          <my-mat-icon *ngIf="isPermitted && !nonEditable"> edit_location_alt </my-mat-icon>
          <my-mat-icon *ngIf="!isPermitted || nonEditable"> location_on </my-mat-icon>
          <div>{{ activeLocation }}</div>
        </div>
      </div>
      }
      @else {
         <!---: Set Active Location -->
        <button
        *ngIf="isPermitted"
        title="Set Location"
        class="mixin/base bg-error text-error-content p-2 rounded-md hover:opacity-75"
        (click)="onOpenFormModal()"
      >
        <my-mat-icon> edit_location_alt </my-mat-icon>
      </button>
      }
      </ng-container>
    </div>
      <ng-template #loading>
        <app-spinner></app-spinner>
      </ng-template>
  `,
})
export class ActiveLocationIndicatorComponent {
  @Input() nonEditable = false
  activeLocation?: string | null = undefined;
  isPermitted = false;

  private getActiveLocationSubscription!: Subscription
  constructor(
    public utils: UtilsService,
    private modalService: ModalService,
    private activeLocationService: ActiveLocationService,
    private permissionService: PermissionService
  ) { }

  ngOnInit(): void {
    this.retrieveAndSetActiveLocation();
    this.setPermission()
  }

  onOpenFormModal() {
    this.modalService.open(ActiveLocationFormModalComponent);
  }

  private retrieveAndSetActiveLocation() {
    this.getActiveLocationSubscription = this.activeLocationService.getActiveLocation().subscribe((value) => {
      if (value !== undefined) {

        if (value)
          this.activeLocation = value.name
        else
          this.activeLocation = null
      }
      else {
        this.activeLocation = undefined
      }
    })
  }

  ngOnDestroy() {
    this.getActiveLocationSubscription.unsubscribe()
  }
  private setPermission() {
    this.isPermitted = this.permissionService.isPermitted([UserRoles.Admin, UserRoles.ResearchManager])
  }
}
