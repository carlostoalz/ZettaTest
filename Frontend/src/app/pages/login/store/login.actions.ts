import { createActionGroup, props } from '@ngrx/store';
import { LoginResultDTO } from '../../../core/models/LoginResultDTO.model';
import { User } from '../../../core/models/User.model';

export const LoginActions = createActionGroup({
  source: 'Login',
  events: {
    Login: props<{ user: User }>(),
    'Login Success': props<{ loginResult: LoginResultDTO }>(),
    Register: props<{ user: User }>(),
    'Register Success': props<{ user: User }>(),
  },
});
