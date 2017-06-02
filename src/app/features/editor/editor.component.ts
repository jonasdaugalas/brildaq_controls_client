import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as appState from '@app/core/state/state.reducer';

import * as configsActions from '@app/core/state/configurations.actions';
import * as runningActions from '@app/core/state/running-configs.actions';
import * as configDetailsActions from '@app/core/state/config-details.actions';
import * as actionRequestsActions from '@app/core/state/action-requests.actions';
import * as historyActions from '@app/core/state/history.actions';
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

    urlSegments = [];
    path: string = null;
    selectedVersion = null;
    firstLoadVersionSelected = false;

    history$: Observable<any>;
    historyRequest$: Observable<any>;

    configurationIds$: Observable<Array<string>>;
    configurations$: Observable<{string: Configuration}>;
    configurationsRequest$: Observable<RequestState>;

    runningDetails$: Observable<{string: RunningDetails}>;
    runningDetailsRequest$: Observable<RequestState>;

    configDetails$: Observable<{string: ConfigDetails}>;

    constructor(protected store: Store<appState.State>, protected route: ActivatedRoute) {
        this.configDetails$ = this.store.select(appState.selectConfigDetailsEntities);
        // this.historyRequest$ = this.store.select(appState.selectHistoryRequest);
    }

    ngOnInit() {
        // this.store
        //     .takeUntil(this.ngUnsubscribe)
        //     .subscribe(val => {
        //         console.log(val);
        //     });

        // this.updateConfigs();

        // ActivatedRoute attributes do not need to be unsubscribed.
        this.route.url.subscribe(urlSegments => {
            this.urlSegments = urlSegments;
            this.updatePathFromURLSegments();
            this.reselectWorkingConfiguration();
        });
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    protected updatePathFromURLSegments() {
        if (this.urlSegments.length === 0) {
            this.path = null;
            return;
        }
        this.path = this.urlSegments.reduce((acc, val, index, array) => {
            return acc + '/' + val.path;
        }, '');
    }

    reselectWorkingConfiguration() {
        console.log('reselecting', this.path);
        this.firstLoadVersionSelected = false;
        this.history$ = this.store.select(appState.selectHistoryById(this.path));
        this.historyRequest$ = this.store.select(appState.selectHistoryRequestById(this.path));
        this.store.dispatch(new historyActions.GetNewestHistoryAction({
            configId: this.path, size: 20
        }));
        this.historyRequest$
            .takeUntil(this.route.url)
            .takeUntil(this.ngUnsubscribe)
            .withLatestFrom(this.history$).subscribe(([request, history]) => {
                console.log('history request subscription', request, history);
                if (!request.forNewest) {
                    console.log('not for newest. skipping');
                    return;
                }
                this._selectVersion(history[0].version)
                this.firstLoadVersionSelected = true;
            });
    }

    protected _selectVersion(newVersion: number) {
        this.selectedVersion = newVersion;
        this.updateConfigDetails();
    }

    selectVersion(newVersion: number) {
        if (!this.firstLoadVersionSelected) {
            console.log('Initial version not yet selected. ');
            return;
        }
        this._selectVersion(newVersion);
    }

    updateConfigDetails() {
        this.store.dispatch(new configDetailsActions.RequestAction({
            id: this.path + '/' + this.selectVersion,
            withXML: true
        }));
    }

}
