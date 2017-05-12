import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/';
import 'rxjs/add/operator/map';
import { Configuration } from '../models/configuration';


@Injectable()
export class ConfigurationsService {

    protected owner: Observable<string>;
    configs: Observable<Array<Configuration>>;

    constructor(protected http: Http) {}

    getConfigs() {
        console.log('in getConfigs');
        return this.http.get('/api/configurations')
            .map((resp) => resp.json());
    }
}
