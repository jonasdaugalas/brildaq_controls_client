import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { State } from './state.reducer';
import { ConfigurationsService } from '../services/configurations.service';
import { RunningDetails } from '../models/running-details';
import * as runningActions from './running-configs.actions';


@Injectable()
export class RunningConfigsEffects {

    @Effect()
    update$: Observable<Action> = this.actions$
        .ofType(runningActions.UPDATE, runningActions.UPDATE_CANCEL)
        .switchMap((action) => {
            console.log('in update running effect');
            if (action.type === runningActions.UPDATE_CANCEL) {
                return Observable.empty();
            }
            return this.configService.getRunning(action.payload)
                .map((response) => (new runningActions.UpdateSuccessAction({
                    result: response,
                    rcmsUser: action.payload
                })))
                .catch(err => (Observable.of(
                    new runningActions.UpdateFailedAction({
                        message: 'Failed retrieving running',
                        error: err
                    })
                )));
        });

    @Effect()
    updateSucces$: Observable<Action> = this.actions$
        .ofType(runningActions.UPDATE_SUCCESS)
        .withLatestFrom(this.store$)
        .switchMap(([action, state])=> {
            const uris = state.running.ids.map((key) => {
                return state.running.entities[key].URI;
            });
            return Observable.of(new runningActions.UpdateStatesAction(uris));
        });

    @Effect()
    updateStates$: Observable<Action> = this.actions$
        .ofType(runningActions.UPDATE_STATES, runningActions.UPDATE_STATES_CANCEL)
        .switchMap(action => {
            console.log('in update states effect');
            if (action.type === runningActions.UPDATE_STATES_CANCEL) {
                return Observable.empty();
            }
            return this.configService.getStates(action.payload)
                .map((response) => (new runningActions.UpdateStatesSuccessAction(response)))
                .catch(err => (Observable.of(
                    new runningActions.UpdateFailedAction({
                        message: 'Failed retrieving states',
                        error: err
                    })
                )));
        });

    constructor(
        protected actions$: Actions,
        protected store$: Store<State>,
        protected configService: ConfigurationsService) {};
}
