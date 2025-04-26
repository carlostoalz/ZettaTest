import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoginResultDTO } from '../../../core/models/LoginResultDTO.model';
import { User } from '../../../core/models/User.model';
import { LoginActions } from '../store/login.actions';
import { State } from '../store/login.reducer';
import * as LoginSelectors from '../store/login.selectors';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private store = inject(Store<State>);

  Login(user: User): void {
    this.store.dispatch(LoginActions.login({ user }));
  }

  Register(user: User): void {
    this.store.dispatch(LoginActions.register({ user }));
  }

  getLoginResult(): Observable<LoginResultDTO> {
    return this.store.select(LoginSelectors.getLoginResult);
  }

  getUser(): Observable<User> {
    return this.store.select(LoginSelectors.getUser);
  }
}
