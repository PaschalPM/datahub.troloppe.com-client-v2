import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PermissionService } from '@shared/services/permission.service';

export const adhocStaffGuard: CanActivateFn = () => {
  const permissionService = inject(PermissionService);
  const router = inject(Router);

  if (!permissionService.isAdhocStaff) return true;

  router.navigateByUrl('/dashboard');
  return false

};
