import { createFeatureSelector, createSelector } from '@ngrx/store';
import { loginFeatureKey, State } from './login.reducer';

const getState = createFeatureSelector<State>(loginFeatureKey);

export const getLoginResult = createSelector(
  getState,
  (state: State) => state.loginResult
);

export const getUser = createSelector(getState, (state: State) => state.user);
