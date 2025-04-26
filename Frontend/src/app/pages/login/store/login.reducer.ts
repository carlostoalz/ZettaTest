import { createReducer, on } from '@ngrx/store';
import { LoginResultDTO } from '../../../core/models/LoginResultDTO.model';
import { User } from '../../../core/models/User.model';
import { LoginActions } from './login.actions';

export const loginFeatureKey = 'login';

export interface State {
  loginResult: LoginResultDTO;
  user: User;
}

export const initialState: State = {
  loginResult: null,
  user: null,
};

export const reducer = createReducer(
  initialState,
  on(LoginActions.login, (state) => ({
    ...state,
    loginResult: null,
  })),
  on(LoginActions.loginSuccess, (state, { loginResult }) => ({
    ...state,
    loginResult,
  })),
  on(LoginActions.register, (state) => ({
    ...state,
    user: null,
  })),
  on(LoginActions.registerSuccess, (state, { user }) => ({
    ...state,
    user,
  }))
);
