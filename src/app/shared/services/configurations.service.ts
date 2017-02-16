import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/';
import { AppState, CONFIGURATIONS_UPDATE } from '@app/shared/models/app-state';
import { Configuration } from '@app/shared/models/configuration';
// For `@app` to resolve, bellow option needs to be added to tsconfig.json:
// "paths": {
//     "@app/*": ["app/*"]
// },


@Injectable()
export class ConfigurationsService {
    configs: Observable<Array<Configuration>>;

    constructor(private store: Store<AppState>) {
        this.configs = store.select('configurations');
        this.configs.subscribe(val => {
            console.log(val);
        });
        this.updateConfigs();
        this.updateConfigs();
        this.updateConfigs();
    }

    updateConfigs() {
        this.store.dispatch({
            type: CONFIGURATIONS_UPDATE,
            payload: [{
                path: 'crap/crap',
                state: 'ON',
                test: Math.random()
            }, {
                path: 'crap/asdf',
                state: 'ERROR',
                test: Math.random()
            }]
        });
    }
}
