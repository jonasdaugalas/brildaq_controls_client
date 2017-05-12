import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ConfigurationsService } from '../services/configurations.service';
import { Configuration } from '../models/configuration';
import * as configsActions from './configurations.actions';


@Injectable()
export class ConfigurationsEffects {

    @Effect()
    update$: Observable<Action> = this.actions$
        .ofType(configsActions.UPDATE)
        .switchMap(() => {
            console.log('doing effect');
            return this.configService.getConfigs()
                .map((response) => (new configsActions.UpdateSuccessAction(response)));
        });

    constructor(protected actions$: Actions, protected configService: ConfigurationsService) {
    };
}