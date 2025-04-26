import { createFeatureSelector, createSelector } from '@ngrx/store';
import { sharedFeatureKey, State } from './shared.reducer';

const getState = createFeatureSelector<State>(sharedFeatureKey);

export const getLoading = createSelector(
  getState,
  (state: State) => state.loading
);

export const getError = createSelector(getState, (state: State) => state.error);
