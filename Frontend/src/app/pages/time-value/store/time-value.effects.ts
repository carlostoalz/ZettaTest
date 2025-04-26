import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { catchError, exhaustMap, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { UrlApis } from '../../../core/enums/api.url';
import { Result } from '../../../core/models/Result.model';
import { TimeValue } from '../../../core/models/TimeValue.model';
import { ApiService } from '../../../core/services/api.service';
import { SharedService } from '../../../shared/services/shared.service';
import { SharedActions } from '../../../shared/store/shared.actions';
import { TimeValueActions } from './time-value.actions';

@Injectable()
export class TimeValueEffects {
  private actions$ = inject(Actions);
  private apiService = inject(ApiService);
  private sharedService = inject(SharedService);
  private messageService = inject(MessageService);

  getTimeValues$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimeValueActions.getTimeValues),
      tap(() => this.sharedService.SetLoading(true)),
      exhaustMap(() =>
        this.apiService
          .getAll<Result<TimeValue[]>>(
            environment.backendAPI,
            UrlApis.timeValue
          )
          .pipe(
            switchMap((response) => [
              TimeValueActions.getTimeValuesSuccess({
                timeValues: response.body.Data,
              }),
              SharedActions.setLoading({ loading: false }),
            ]),
            catchError((error) => of(SharedActions.onError({ error })))
          )
      )
    )
  );

  createTimeValue$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimeValueActions.createTimeValue),
      tap(() => this.sharedService.SetLoading(true)),
      exhaustMap((props) =>
        this.apiService
          .post<Result<TimeValue>>(
            props.timeValue,
            environment.backendAPI,
            UrlApis.timeValue
          )
          .pipe(
            switchMap((response) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Time value Created',
              });
              return [
                TimeValueActions.createTimeValueSuccess({
                  timeValue: response.body.Data,
                }),
                SharedActions.setLoading({ loading: false }),
              ];
            }),
            catchError((error) => of(SharedActions.onError({ error })))
          )
      )
    )
  );

  updateTimeValue$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimeValueActions.updateTimeValue),
      tap(() => this.sharedService.SetLoading(true)),
      exhaustMap((props) =>
        this.apiService
          .put<Result<TimeValue>>(
            props.timeValue,
            environment.backendAPI,
            UrlApis.timeValue
          )
          .pipe(
            switchMap((response) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Time value Updated',
              });
              return [
                TimeValueActions.updateTimeValueSuccess({
                  timeValue: response.body.Data,
                }),
                SharedActions.setLoading({ loading: false }),
              ];
            }),
            catchError((error) => of(SharedActions.onError({ error })))
          )
      )
    )
  );

  deleteTimeValue$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimeValueActions.deleteTimeValue),
      tap(() => this.sharedService.SetLoading(true)),
      exhaustMap((props) =>
        this.apiService
          .delete<Result<TimeValue>>(
            props.id,
            environment.backendAPI,
            UrlApis.timeValue
          )
          .pipe(
            switchMap((response) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Time value Deleted',
              });
              return [
                TimeValueActions.deleteTimeValueSuccess({
                  deletedTimeValue: response.body.Data,
                }),
                SharedActions.setLoading({ loading: false }),
              ];
            }),
            catchError((error) => of(SharedActions.onError({ error })))
          )
      )
    )
  );
}
