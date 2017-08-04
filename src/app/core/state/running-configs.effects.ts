import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as appState from './state.reducer';
import { ConfigurationsService } from '../services/configurations.service';
import { RunningDetails } from '../models/running-details';
import * as runningActions from './running-configs.actions';


@Injectable()
export class RunningConfigsEffects {

    @Effect()
    update$: Observable<runningActions.Actions> = this.actions$
        .ofType(runningActions.UPDATE, runningActions.UPDATE_CANCEL)
        .switchMap((action) => {
            if (action.type === runningActions.UPDATE_CANCEL) {
                return Observable.empty();
            }
            const payload = (<runningActions.UpdateAction>action).payload;
            return this.configService.getRunning(payload)
                .map((response) => (new runningActions.UpdateSuccessAction({
                    result: response,
                    rcmsUser: payload
                })))
                .catch(err => (Observable.of(
                    new runningActions.UpdateFailedAction({
                        message: 'Failed retrieving running',
                        error: err
                    })
                )));
        });

    @Effect()
    updateSucces$: Observable<runningActions.Actions> = this.actions$
        .ofType(runningActions.UPDATE_SUCCESS)
        .withLatestFrom(this.store$.select(appState.selectRunningEntities))
        .switchMap(([action, running])=> {
            const uris = Object.keys(running).map((key) => {
                return running[key].URI;
            });
            return Observable.of(new runningActions.UpdateStatesAction(uris));
        });

    @Effect()
    updateStates$: Observable<runningActions.Actions> = this.actions$
        .ofType(runningActions.UPDATE_STATES, runningActions.UPDATE_STATES_CANCEL)
        .switchMap(action => {
            if (action.type === runningActions.UPDATE_STATES_CANCEL) {
                return Observable.empty();
            }
            const payload = (<runningActions.UpdateStatesAction>action).payload;
            return this.configService.getStates(payload)
                .map((response) => (new runningActions.UpdateStatesSuccessAction(response)))
                .catch(err => (Observable.of(
                    new runningActions.UpdateFailedAction({
                        message: 'Failed retrieving states',
                        error: err
                    })
                )));
        });

    constructor(
        protected actions$: Actions<runningActions.Actions>,
        protected store$: Store<appState.State>,
        protected configService: ConfigurationsService) {};
}
