import { createActionGroup, props } from '@ngrx/store';

export const SharedActions = createActionGroup({
  source: 'Shared',
  events: {
    'Set Loading': props<{ loading: boolean }>(),
    'On Error': props<{ error: any }>(),
  },
});
