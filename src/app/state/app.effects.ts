import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as coreState from '@app/core/state/state.reducer';
import * as appReducer from './app.reducer';
import * as appActions from './app.actions';

@Injectable()
export class AppEffects {

    @Effect()
    handleAlert$: Observable<Action> = this.actions$
        .ofType(appActions.HANDLE_ALERT)
        .withLatestFrom(this.store$.select(state => {
            return appReducer.selectAlerts(state['appModule']);
        }))
        .switchMap(([action, alerts]) => {
            console.log('in Handle alert effect');
            if (alerts.handleAlert) {
                const payload = (<appActions.HandleAlertAction>action).payload;
                const newAction = payload.alert.actions[payload.actionName].action;
                if (newAction) {
                    return Observable.of(newAction);
                }
            }
            return Observable.empty();
        });


    constructor(
        protected actions$: Actions,
        protected store$: Store<coreState.State>) {}

}
