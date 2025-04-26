import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TimeValue } from '../../../core/models/TimeValue.model';
import { TimeValueActions } from '../store/time-value.actions';
import { State } from '../store/time-value.reducer';
import * as TimeValueSelectors from '../store/time-value.selectors';

@Injectable({
  providedIn: 'root',
})
export class TimeValueService {
  private store = inject(Store<State>);

  GetTimeValues(): void {
    this.store.dispatch(TimeValueActions.getTimeValues());
  }
  CreateTimeValue(timeValue: TimeValue): void {
    this.store.dispatch(TimeValueActions.createTimeValue({ timeValue }));
  }
  UpdateTimeValue(timeValue: TimeValue): void {
    this.store.dispatch(TimeValueActions.updateTimeValue({ timeValue }));
  }
  DeleteTimeValue(id: number): void {
    this.store.dispatch(TimeValueActions.deleteTimeValue({ id }));
  }
  getTimeValues(): Observable<TimeValue[]> {
    return this.store.select(TimeValueSelectors.getTimeValues);
  }
  getTimeValue(): Observable<TimeValue> {
    return this.store.select(TimeValueSelectors.getTimeValue);
  }
  getDeletedTimeValue(): Observable<TimeValue> {
    return this.store.select(TimeValueSelectors.getDeletedTimeValue);
  }
}
