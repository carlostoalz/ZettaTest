import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { TimeValue } from '../../../core/models/TimeValue.model';

export const TimeValueActions = createActionGroup({
  source: 'TimeValue',
  events: {
    'Get TimeValues': emptyProps(),
    'Get TimeValues Success': props<{ timeValues: TimeValue[] }>(),
    'Create TimeValue': props<{ timeValue: TimeValue }>(),
    'Create TimeValue Success': props<{ timeValue: TimeValue }>(),
    'Update TimeValue': props<{ timeValue: TimeValue }>(),
    'Update TimeValue Success': props<{ timeValue: TimeValue }>(),
    'Delete TimeValue': props<{ id: number }>(),
    'Delete TimeValue Success': props<{ deletedTimeValue: TimeValue }>(),
  },
});
