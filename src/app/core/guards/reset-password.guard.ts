import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const resetPasswordGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const token = route.queryParams['token'];
  const email = route.queryParams['email'] ?? route.queryParams['amp;email']

  if (token && email) {
    return true;
  }

  router.navigateByUrl('/');
  return false;
};
