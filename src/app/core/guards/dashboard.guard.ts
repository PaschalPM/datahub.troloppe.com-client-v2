import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { catchError, of, switchMap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { LoaderService } from '@shared/services/loader.service';
import { AlertService } from '@shared/services/alert.service';

export const dashboardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const loader = inject(LoaderService);
  const alert = inject(AlertService);

  return authService.getLoggedInUser().pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        alert.error('Error: Session Logged Out.',);
        router.navigate(['/sign-in'], {
          queryParams: {
            returnUrl: state.url,
          },
        });
        loader.stop();
        return of(null);
      }
      return throwError(() => err);
    }),
    switchMap(() => {
      loader.stop();
      return of(true);
    })
  );
};
