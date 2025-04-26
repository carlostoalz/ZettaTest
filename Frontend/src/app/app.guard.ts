import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  type CanActivateFn,
} from '@angular/router';
import { LocalStorageService } from './shared/services/local-storage.service';

export const appGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const ls = inject(LocalStorageService);
  const token = ls.GetToken();
  const currentPath = route.routeConfig?.path;
  if (!token) return currentPath === 'login' ? true : router.parseUrl('/login');
  if (token && currentPath === 'login') return router.parseUrl('/');
  return true;
};
