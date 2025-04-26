import { ActionReducerMap } from '@ngrx/store';
import { LoginEffects } from './pages/login/store/login.effects';
import * as fromLogin from './pages/login/store/login.reducer';
import * as fromTimeValue from './pages/time-value/store/time-value.reducer';
import * as fromShared from './shared/store/shared.reducer';

interface AppState {
  login: fromLogin.State;
  shared: fromShared.State;
  timeValue: fromTimeValue.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  login: fromLogin.reducer,
  shared: fromShared.reducer,
  timeValue: fromTimeValue.reducer,
};

export const appEffects = [LoginEffects];
