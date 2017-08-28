import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppService } from '@app/services/app.service';
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
            if (alerts.handleAlert) {
                const payload = (<appActions.HandleAlertAction>action).payload;
                const newAction = payload.alert.actions[payload.actionName].action;
                if (newAction) {
                    return Observable.of(newAction);
                }
            }
            return Observable.empty();
        });

    @Effect()
    setCookiew$: Observable<Action> = this.actions$
        .ofType(appActions.SET_COOKIE)
        .switchMap(action => {
            const payload = (<appActions.SetCookieAction>action).payload;
            const date = new Date();
            date.setTime(date.getTime() + (payload.days*24*60*60*1000));
            const expires = "; expires=" + date.toUTCString();
            document.cookie = payload.name + '=' + payload.value + expires + '; path=/';
            return Observable.empty();
        });

    @Effect()
    getBuildNumber$: Observable<Action> = this.actions$
        .ofType(appActions.GET_BUILD_NUMBER)
        .switchMap(action => {
            return this.appService.getBuildNumber()
                .map(response => (
                    new appActions.SuccessGetNewestAppBuildNumberAction(response)
                ))
                .catch((err, caught) => Observable.of(
                    new appActions.FailGetNewestAppBuildNumberAction()
                ))
        });


    constructor(
        protected actions$: Actions,
        protected store$: Store<coreState.State>,
        protected appService: AppService) {}

}
