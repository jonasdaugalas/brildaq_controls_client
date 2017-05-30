import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as appState from '@app/core/state/state.reducer';

import * as configsActions from '@app/core/state/configurations.actions';
import * as runningActions from '@app/core/state/running-configs.actions';
import * as configDetailsActions from '@app/core/state/config-details.actions';
import * as actionRequestsActions from '@app/core/state/action-requests.actions';
import { Configuration } from '@app/core/models/configuration';
import { RunningDetails, STATES as RUNNING_STATES } from '@app/core/models/running-details';
import { ConfigDetails } from '@app/core/models/config-details';
import { RequestState } from '@app/core/models/request-state';
import { ActionRequest } from '@app/core/models/action-request';


@Component({
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<void> = new Subject<void>();

    _path: string = null;
    set path(newPath) {
        this._path = newPath;
        this.reselectWorkingConfiguration();
    }
    get path() {
        return this._path;
    }

    configurationIds$: Observable<Array<string>>;
    configurations$: Observable<{string: Configuration}>;
    configurationsRequest$: Observable<RequestState>;

    runningDetails$: Observable<{string: RunningDetails}>;
    runningDetailsRequest$: Observable<RequestState>;

    configDetails$: Observable<{string: ConfigDetails}>;

    constructor(protected store: Store<appState.State>, protected route: ActivatedRoute) {
        this.configDetails$ = this.store.select(appState.selectConfigDetailsEntities);
        // this.history$ = this.store.select(appState.selectHistoryEntities);
        // this.historyRequest$ = this.store.select(appState.selectHistoryRequest);
    }

    ngOnInit() {
        // this.store
        //     .takeUntil(this.ngUnsubscribe)
        //     .subscribe(val => {
        //         console.log(val);
        //     });

        // this.updateConfigs();

        // ActivatedRoute attributes does not need to be unsubscribed.
        this.route.url.subscribe(urlSegments => {
            if (urlSegments.length === 0) {
                this.path = null;
                return;
            }
            this.path = urlSegments.reduce((acc, val, index, array) => {
                return acc + '/' + val.path;
            }, '');
            console.log('route url changed. new path', this.path);
        });
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    reselectWorkingConfiguration() {
        console.log('reselecting', this.path);
        this.configDetails$.takeLast(1).subscribe(val => {
            console.log('last configDetails', val[this.path]);
        });
        // const config =
        // this.store.dispatch(new historyActions.GetHistoryAction(this.path, 20));
        // this.history$.take(1).subscribe(val => {
        //     const
        // });
    }

}
