import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/';
import 'rxjs/add/operator/map';

import { Configuration } from '../models/configuration';
import * as CONTROL_ACTIONS from '../models/control-actions';


@Injectable()
export class ConfigurationsService {

    public static readonly postHeaders = new Headers({'Content-Type': 'application/json'});
    protected owner: Observable<string>;
    configs: Observable<Array<Configuration>>;

    constructor(protected http: Http) {}

    getConfigs() {
        return this.http.get('api/configurations')
            .map((resp) => resp.json())
            .catch((err) => Observable.throw(err));
    }

    getRunning(owner: string) {
        return this.http.get('api/running/' + owner)
            .map((resp) => resp.json())
            .catch((err) => Observable.throw(err));
    }

    getStates(uris: Array<string>) {
        return this.http.post(
            'api/states',
            JSON.stringify(uris),
            {headers: ConfigurationsService.postHeaders})
            .map((resp) => resp.json())
            .catch((err) => Observable.throw(err));
    }

    getState(path: string) {
        return this.http.get(
            'api/state' + path)
            .map((resp) => resp.json())
            .catch((err) => Observable.throw(err));
    }

    getConfigDetails(id: string, withXML = false) {
        let url = 'api/config' + id;
        if (!withXML) {
            url += '/noxml';
        }
        return this.http.get(url)
            .map((resp) => resp.json())
            .catch((err) => Observable.throw(err));
    }

    sendAction(id: string, actionType: string) {
        let url = 'api';
        switch (actionType) {
        case CONTROL_ACTIONS.CREATE_FM:
            url += '/create';
            break;
        case CONTROL_ACTIONS.DESTROY_FM:
            url += '/destroy';
            break;
        case CONTROL_ACTIONS.TURN_ON:
        case CONTROL_ACTIONS.TURN_OFF:
        case CONTROL_ACTIONS.RESET:
            url += '/send/' + actionType;
            break;
        default:
            return Observable.throw('Unknown action ' + actionType);
        }
        url += id;
        return this.http.get(url)
            .catch((err) => Observable.throw(err));
    }

    getHistory(id: string, size=20, below=null) {
        let url = 'api/history' + id + '/limit=' + size;
        if (below) {
            // yes. url parameter has double 'l'...
            url += '/bellow=' + below;
        }
        return this.http.get(url)
            .map((resp) => resp.json())
            .catch((err) => Observable.throw(err));
    }

    buildFinalXML(path: string, version: number, xml: string, executive: any) {
        const url = 'api/buildfinalxml';
        return this.http.post(url, {
            path: path,
            version: version,
            xml: xml,
            executive: executive
        })
            .map(response => response.text())
            .catch(err => Observable.throw(err));
    }

    buildXML(path: string, version: number, fields: any) {
        const url = 'api/buildxml';
        return this.http.post(url, {
            path: path,
            version: version,
            fields: fields
        })
            .map(response => response.text())
            .catch(err => Observable.throw(err));
    }

    submitFields(comment: string, path: string, version: number, fields: any) {
        const url = 'api/submitfields';
        return this.http.post(url, {
            comment: comment,
            path: path,
            version: version,
            fields: fields
        })
            .catch(err => Observable.throw(err));
    }

    submitXML(comment: string, path: string, version: number, xml: string, executive: any) {
        const url = 'api/submitxml';
        return this.http.post(url, {
            comment: comment,
            path: path,
            version: version,
            xml: xml,
            executive: executive
        })
            .catch(err => Observable.throw(err));
    }

}
