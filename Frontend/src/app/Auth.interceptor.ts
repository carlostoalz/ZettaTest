import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from './shared/services/local-storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const ls = inject(LocalStorageService);
  const token = ls.GetToken();

  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(authReq);
};
