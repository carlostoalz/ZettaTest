import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { UrlApis } from '../../../core/enums/api.url';
import { LoginResultDTO } from '../../../core/models/LoginResultDTO.model';
import { Result } from '../../../core/models/Result.model';
import { User } from '../../../core/models/User.model';
import { ApiService } from '../../../core/services/api.service';
import { SharedService } from '../../../shared/services/shared.service';
import { SharedActions } from '../../../shared/store/shared.actions';
import { LoginActions } from './login.actions';

@Injectable()
export class LoginEffects {
  private actions$ = inject(Actions);
  private apiService = inject(ApiService);
  private sharedService = inject(SharedService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.login),
      tap(() => this.sharedService.SetLoading(true)),
      exhaustMap((props) =>
        this.apiService
          .post<Result<LoginResultDTO>>(
            props.user,
            environment.backendAPI,
            UrlApis.login
          )
          .pipe(
            switchMap((response) => [
              LoginActions.loginSuccess({ loginResult: response.body.Data }),
              SharedActions.setLoading({ loading: false }),
            ]),
            catchError((error) => of(SharedActions.onError({ error })))
          )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.register),
      tap(() => this.sharedService.SetLoading(true)),
      exhaustMap((props) =>
        this.apiService
          .post<Result<User>>(
            props.user,
            environment.backendAPI,
            UrlApis.register
          )
          .pipe(
            switchMap((response) => [
              LoginActions.registerSuccess({ user: response.body.Data }),
              SharedActions.setLoading({ loading: false }),
            ]),
            catchError((error) => of(SharedActions.onError({ error })))
          )
      )
    )
  );
}
