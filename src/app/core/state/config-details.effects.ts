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
    update$: Observable<cfgDetailsActions.Actions> = this.actions$
        .ofType(cfgDetailsActions.REQUEST)
        .mergeMap((action) => {
            const payload = (<cfgDetailsActions.RequestAction>action).payload;
            return this.configService.getConfigDetails(payload.id, payload.withXML)
                .map((response) => (new cfgDetailsActions.RequestSuccessAction({
                    id: payload.id,
                    withXML: payload.withXML,
                    result: response
                })))
                .catch((err, caught) => Observable.of(
                    new cfgDetailsActions.RequestFailedAction({
                        id: payload.id,
                        message: 'HTTP request failed',
                        error: err
                    })
                ));
        });

    constructor(protected actions$: Actions,
                protected configService: ConfigurationsService) {};
}
