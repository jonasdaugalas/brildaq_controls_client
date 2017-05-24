import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as appState from './state.reducer';
import { ConfigurationsService } from '../services/configurations.service';
import * as actionRequestsActions from './action-requests.actions';


@Injectable()
export class ActionRequestsEffects {

    @Effect()
    update$: Observable<Action> = this.actions$
        .ofType(actionRequestsActions.SEND_ACTION)
        .withLatestFrom(this.store$.select(appState.selectActionRequests))
        .mergeMap(([action, actionRequests]) => {
            if (actionRequests.hasOwnProperty(action.payload.configId) &&
                actionRequests[action.payload.configId].ignore) {
                console.log('Ignoring SEND_ACTION from effects', action.payload.configId, action.payload.actionType);
                return Observable.empty();
            }
            return this.configService.sendAction(action.payload.configId, action.payload.actionType)
                .delay(2000)
                .map((response) => (new actionRequestsActions.SendActionSuccessAction({
                    configId: action.payload.configId,
                    actionType: action.payload.actionType
                })))
                .catch((err, caught) => Observable.of(
                    new actionRequestsActions.SendActionFailedAction({
                        configId: action.payload.configId,
                        actionType: action.payload.actionType,
                        message: 'Failed to send action ' + action.payload.actionType,
                        error: err
                    })
                ));
        });

    constructor(
        protected actions$: Actions,
        protected store$: Store<appState.State>,
        protected configService: ConfigurationsService) {};
}
