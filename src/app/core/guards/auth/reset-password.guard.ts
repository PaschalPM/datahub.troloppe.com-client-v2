import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { EMAIL_FOR_RESET_PASSWORD } from '@shared/services/constants/localstorage';
import { ClientStorageService } from '@shared/services/client-storage.service';

export const resetPasswordGuard: CanActivateFn = (route) => {
  const css = inject(ClientStorageService);
  const router = inject(Router);
  const token = route.queryParams['token'];
  const email = css.local().get(EMAIL_FOR_RESET_PASSWORD);

  if (token && email) {
    return true;
  }

  router.navigateByUrl('/');
  return false;
};
