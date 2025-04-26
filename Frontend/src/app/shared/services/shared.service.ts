import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SharedActions } from '../store/shared.actions';
import { State } from '../store/shared.reducer';
import * as SharedSelectors from '../store/shared.selectors';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private store = inject(Store<State>);

  SetLoading(loading: boolean): void {
    this.store.dispatch(SharedActions.setLoading({ loading }));
  }

  getLoading(): Observable<boolean> {
    return this.store.select(SharedSelectors.getLoading);
  }

  getError(): Observable<any> {
    return this.store.select(SharedSelectors.getError);
  }
}
