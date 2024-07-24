import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ClientStorageService } from '@shared/services/client-storage.service';

export const resetPasswordGuard: CanActivateFn = (route) => {
  const css = inject(ClientStorageService);
  const router = inject(Router);
  const token = route.queryParams['token'];
  const email = route.queryParams['email'] ?? route.queryParams['amp;email']

  if (token && email) {
    return true;
  }

  router.navigateByUrl('/');
  return false;
};
