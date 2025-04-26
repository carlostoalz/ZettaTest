import { createReducer, on } from '@ngrx/store';
import { TimeValue } from '../../../core/models/TimeValue.model';
import { TimeValueActions } from './time-value.actions';

export const timeValueFeatureKey = 'timeValue';

export interface State {
  timeValues: TimeValue[];
  timeValue: TimeValue;
  deletedTimeValue: TimeValue;
}

export const initialState: State = {
  timeValues: [],
  timeValue: null,
  deletedTimeValue: null,
};

export const reducer = createReducer(
  initialState,
  on(TimeValueActions.getTimeValues, (state) => ({
    ...state,
    timeValues: [],
  })),
  on(TimeValueActions.getTimeValuesSuccess, (state, { timeValues }) => ({
    ...state,
    timeValues,
  })),
  on(TimeValueActions.createTimeValue, (state) => ({
    ...state,
    timeValue: null,
  })),
  on(TimeValueActions.createTimeValueSuccess, (state, { timeValue }) => ({
    ...state,
    timeValue,
  })),
  on(TimeValueActions.updateTimeValue, (state) => ({
    ...state,
    timeValue: null,
  })),
  on(TimeValueActions.updateTimeValueSuccess, (state, { timeValue }) => ({
    ...state,
    timeValue,
  })),
  on(TimeValueActions.deleteTimeValue, (state) => ({
    ...state,
    deletedTimeValue: null,
  })),
  on(
    TimeValueActions.deleteTimeValueSuccess,
    (state, { deletedTimeValue }) => ({
      ...state,
      deletedTimeValue,
    })
  )
);
