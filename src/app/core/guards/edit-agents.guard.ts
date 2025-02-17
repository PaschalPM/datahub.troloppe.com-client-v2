import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { PermissionService } from '@shared/services/permission.service';

export const editAgentsGuard: CanActivateFn = (route, state) => {
  const permissionService = inject(PermissionService)
  return permissionService.isAdmin;
};
