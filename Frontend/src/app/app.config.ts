import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { routes } from './app.routes';
import { appEffects, appReducers } from './app.store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    provideStore(appReducers, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      },
    }),
    provideEffects(appEffects),
    provideAnimationsAsync(),
    MessageService,
  ],
};
