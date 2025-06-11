import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PermissionService } from '@shared/services/permission.service';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  standalone: true,
  imports: [NgIf],
  template: `
    <button *ngIf="permissionService.belongsToCurrentUser(resourceUpdatedById)"

      class="text-secondary"
      (click)="onClick($event)"
    >
      Edit
    </button>
  `,
})
export class ActionsComponent implements ICellRendererAngularComp {
  public params: any;
  public resourceUpdatedById!: number;
  public permissionService = inject(PermissionService);

   agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params;
    this.resourceUpdatedById = this.params.data.creator_id;
  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return true;
  }

  onClick($event: any) {
    if (this.params.onClick instanceof Function) {
      const params = {
        event: $event,
        rowData: this.params.node.data,
      };
      this.params.onClick(params)
    }
  }
}
