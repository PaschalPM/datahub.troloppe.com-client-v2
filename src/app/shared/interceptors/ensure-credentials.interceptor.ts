import { HttpInterceptorFn } from '@angular/common/http';

export const ensureCredentialsInterceptor: HttpInterceptorFn = (req, next) => {
  
  return next(req);
};
