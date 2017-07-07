import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as appState from './state.reducer';
import * as historyActions from './history.actions';
import { ConfigurationsService } from '../services/configurations.service';


@Injectable()
export class HistoryEffects {

    @Effect()
    getHistory$: Observable<Action> = this.actions$
        .ofType(historyActions.GET_NEWEST, historyActions.GET_OLDER)
        .withLatestFrom(
            this.store$.select(appState.selectHistoryEntities),
            this.store$.select(appState.selectHistoryRequests))
        .mergeMap(([action, history, historyRequests]) => {
            const payload = (<historyActions.GetNewestHistoryAction | historyActions.GetOlderHistoryAction> action).payload;
            const id = payload.configId;
            let below = null;
            if (action.type === historyActions.GET_OLDER) {
                if (!history.hasOwnProperty(id) || historyRequests[id].ignore) {
                    return Observable.empty();
                }
                below = history[id][history[id].length -1][0];
            }
            return this.configService.getHistory(id, payload.size, below)
                .map((response) => (new historyActions.GetHistorySuccessAction({
                    configId: id,
                    forNewest: historyRequests[id].forNewest,
                    result: response
                })))
                .catch((err, caught) => Observable.of(
                    new historyActions.GetHistoryFailedAction({
                        configId: id,
                        message: 'HTTP request failed',
                        error: err
                    })
                ));
        });

    constructor(protected actions$: Actions,
                protected configService: ConfigurationsService,
                protected store$: Store<appState.State>) {};
}
