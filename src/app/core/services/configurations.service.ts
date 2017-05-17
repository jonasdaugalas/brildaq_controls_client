import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/';
import 'rxjs/add/operator/map';
import { Configuration } from '../models/configuration';

import * as configsActions from '../state/configurations.actions';


@Injectable()
export class ConfigurationsService {

    public static readonly postHeaders = new Headers({'Content-Type': 'application/json'});
    protected owner: Observable<string>;
    configs: Observable<Array<Configuration>>;

    constructor(protected http: Http) {}

    getConfigs() {
        console.log('in getConfigs');
        return this.http.get('/api/configurations')
            .map((resp) => resp.json())
            .catch((err) => Observable.throw(err));
    }

    getRunning(owner: string) {
        console.log('in getRunning');
        return this.http.get('/api/running/' + owner)
            .map((resp) => resp.json())
            .catch((err) => Observable.throw(err));
    }

    getStates(uris: Array<string>) {
        console.log('in getStates');
        return this.http.post(
            '/api/states',
            JSON.stringify(uris),
            {headers: ConfigurationsService.postHeaders})
            .map((resp) => resp.json())
            .catch((err) => Observable.throw(err));
    }

    getConfigDetails(id: string, withXML = false) {
        console.log('in getConfigDetails');
        let url = '/api/config' + id;
        if (!withXML) {
            url += '/noxml';
        }
        return this.http.get(url)
            .map((resp) => resp.json())
            .catch((err) => Observable.throw(err));
    }

}
