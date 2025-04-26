import { createReducer, on } from '@ngrx/store';
import { SharedActions } from './shared.actions';

export const sharedFeatureKey = 'shared';

export interface State {
  loading: boolean;
  error: any;
}

export const initialState: State = {
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(SharedActions.setLoading, (state, { loading }) => ({
    ...state,
    loading,
  })),
  on(SharedActions.onError, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
