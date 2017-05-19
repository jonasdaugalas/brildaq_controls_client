import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ConfigurationsService } from '../services/configurations.service';
import * as cfgDetailsActions from './config-details.actions';


@Injectable()
export class ConfigDetailsEffects {

    @Effect()
    update$: Observable<Action> = this.actions$
        .ofType(cfgDetailsActions.REQUEST)
        .mergeMap((action) => {
            return this.configService.getConfigDetails(action.payload.id, action.payload.withXML)
                .map((response) => (new cfgDetailsActions.RequestSuccessAction({
                    id: action.payload.id,
                    withXML: action.payload.withXML,
                    result: response
                })))
                .catch((err, caught) => Observable.of(
                    new cfgDetailsActions.RequestFailedAction({
                        id: action.payload.id,
                        message: 'HTTP request failed',
                        error: err
                    })
                ));
        });

    constructor(protected actions$: Actions,
                protected configService: ConfigurationsService) {};
}
