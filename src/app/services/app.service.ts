import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/';
import 'rxjs/add/operator/map';


@Injectable()
export class AppService {

    public static readonly postHeaders = new Headers({'Content-Type': 'application/json'});
    constructor(protected http: Http) {}

    getBuildNumber() {
        return this.http.get('api/appv')
            .map((resp) => resp.json())
            .catch((err) => Observable.throw(err));
    }

}
