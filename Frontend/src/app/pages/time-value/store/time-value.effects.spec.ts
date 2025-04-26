import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TimeValueEffects } from './time-value.effects';

describe('TimeValueEffects', () => {
  let actions$: Observable<any>;
  let effects: TimeValueEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TimeValueEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(TimeValueEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
