import { Routes } from '@angular/router';
import { appGuard } from './app.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [appGuard],
    loadComponent: () =>
      import('./pages/layout/container/layout.component').then(
        (c) => c.LayoutComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/time-value/container/time-value.component').then(
            (c) => c.TimeValueComponent
          ),
      },
    ],
  },
  {
    path: 'login',
    canActivate: [appGuard],
    loadComponent: () =>
      import('./pages/login/container/login.component').then(
        (c) => c.LoginComponent
      ),
  },
];
