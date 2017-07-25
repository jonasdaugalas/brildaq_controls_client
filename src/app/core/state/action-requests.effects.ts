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
            const payload = (<actionRequestsActions.SendActionAction>action).payload;
            if (actionRequests.hasOwnProperty(payload.configId) &&
                actionRequests[payload.configId].ignore) {
                console.log('Ignoring SEND_ACTION from effects', payload.configId, payload.actionType);
                return Observable.empty();
            }
            return this.configService.sendAction(payload.configId, payload.actionType)
                // .delay(2000)
                .map((response) => (new actionRequestsActions.SendActionSuccessAction({
                    configId: payload.configId,
                    actionType: payload.actionType
                })))
                .catch((err, caught) => Observable.of(
                    new actionRequestsActions.SendActionFailedAction({
                        configId: payload.configId,
                        actionType: payload.actionType,
                        message: 'Failed to send action ' + payload.actionType,
                        error: err
                    })
                ));
        });

    constructor(
        protected actions$: Actions,
        protected store$: Store<appState.State>,
        protected configService: ConfigurationsService) {};
}
