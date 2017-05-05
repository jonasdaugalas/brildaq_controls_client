import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/';
import 'rxjs/add/operator/map';
import {
    AppState, CONFIGURATIONS_UPDATE, RUNNINGS_UPDATE
} from '@app/shared/models/app-state';
import { Configuration } from '@app/shared/models/configuration';
// For `@app` to resolve, bellow option needs to be added to tsconfig.json:
// "paths": {
//     "@app/*": ["app/*"]
// },


@Injectable()
export class ConfigurationsService {

    protected owner: Observable<string>;
    configs: Observable<Array<Configuration>>;

    constructor(protected store: Store<AppState>, protected http: Http) {
        this.configs = store.select('configurations');
        this.owner = this.store.select(state => state.rcmsUser);
    }

    updateConfigs() {
        return this.http.get('/api/configurations')
            .map((resp) => resp.json())
            .subscribe((data) => {
                console.log(data);
                const newConfigs = [];
                const paths = Object.keys(data);
                paths.forEach((val, index, arr) => {
                    newConfigs.push(Object.assign(data[val], {'path': val}));
                });
                this.store.dispatch({
                    type: CONFIGURATIONS_UPDATE,
                    payload: newConfigs
                });
                console.log(newConfigs);
                this.updateRunning(this.owner);
            });
    }

    updateRunning(owner) {
        return this.http.get('/api/running/' + owner)
            .map((resp) => resp.json())
            .subscribe((data) => {
                console.log(data);
                const paths = Object.keys(data);
                const updConfigs = [];
                this.configs.forEach((val) => {
                    const config = Object.assign({}, val);
                    if (data.hasOwnProperty(val['path'])) {
                        Object.assign(config, data[val['path']]);
                        config['running'] = true;
                    }
                    updConfigs.push(config);
                });
                this.store.dispatch({
                    type: RUNNINGS_UPDATE,
                    payload: updConfigs
                });
            });
    }

    updateStates(paths) {

    }
}
