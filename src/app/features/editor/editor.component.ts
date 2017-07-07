import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subject, BehaviorSubject, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as appState from '@app/core/state/state.reducer';
import * as editorReducer from './state/editor.reducer';

// import * as configsActions from '@app/core/state/configurations.actions';
// import * as runningActions from '@app/core/state/running-configs.actions';
import * as configDetailsActions from '@app/core/state/config-details.actions';
import * as actionRequestsActions from '@app/core/state/action-requests.actions';
import * as historyActions from '@app/core/state/history.actions';
import * as editorActions from './state/editor.actions';
// import { Configuration } from '@app/core/models/configuration';
import { ConfigDetails } from '@app/core/models/config-details';
// import { RequestState } from '@app/core/models/request-state';
// import { ActionRequest } from '@app/core/models/action-request';


@Component({
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<void> = new Subject<void>();
    protected historySubscription: Subscription;

    urlSegments = [];
    path: string = null;
    selectedVersion = null;
    firstLoadVersionSelected = false;

    history$: Observable<any>;
    historyRequest$: Observable<any>;
    editorMode$: Observable<string>;
    isEditorModeExpert$: Observable<boolean>;

    configDetails$: Observable<ConfigDetails>;

    constructor(protected store: Store<any>, protected route: ActivatedRoute) {
        this.configDetails$ = Observable.empty();
        this.historyRequest$ = Observable.empty();
        this.history$ = Observable.empty();
        this.historySubscription = this.history$.subscribe();
        this.editorMode$ = this.store.select(s => {
            return editorReducer.selectMode(s['editorModule']);
        });
        this.isEditorModeExpert$ = this.editorMode$.map(val => val === 'expert');
    }

    ngOnInit() {

        // this.editorMode$.takeUntil(this.ngUnsubscribe).subscribe(val => {
        // });

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

    switchMode() {
        console.log('switch mode click');
        this.editorMode$.take(1).subscribe(val => {
            console.log('swithc mode inside subscribe', val);
            let newMode = 'expert';
            if (val === 'expert') {
                newMode = 'easy';
            }
            this.store.dispatch(new editorActions.SwitchModeAction(newMode));
        });
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
            configId: this.path, size: 10
        }));
        this.historySubscription.unsubscribe();
        this.historySubscription = this.history$
            .takeUntil(this.ngUnsubscribe)
            .withLatestFrom(this.historyRequest$).subscribe(([history, request]) => {
                console.log('history request subscription', request, history);
                if (!request.forNewest) {
                    console.log('not for newest. skipping');
                    return;
                }
                if (!history.length) {
                    console.log('history no length');
                    return;
                }
                this._selectVersion(history[0][0])
                this.firstLoadVersionSelected = true;
            });
    }

    protected _selectVersion(newVersion: number) {
        this.selectedVersion = newVersion;
        this.configDetails$ = this.store.select(
            appState.selectConfigDetailsById(
                this.path + '/v=' + this.selectedVersion));
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
            id: this.path + '/v=' + this.selectedVersion,
            withXML: true
        }));
    }

    loadOlderHistory() {
        this.store.dispatch(new historyActions.GetOlderHistoryAction({
            configId: this.path, size: 20
        }));
    }

}
