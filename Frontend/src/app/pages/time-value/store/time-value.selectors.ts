import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, timeValueFeatureKey } from './time-value.reducer';

const getState = createFeatureSelector<State>(timeValueFeatureKey);

export const getTimeValues = createSelector(
  getState,
  (state: State) => state.timeValues
);

export const getTimeValue = createSelector(
  getState,
  (state: State) => state.timeValue
);

export const getDeletedTimeValue = createSelector(
  getState,
  (state: State) => state.deletedTimeValue
);
