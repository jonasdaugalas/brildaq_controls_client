import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subject, BehaviorSubject, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as appState from '@app/core/state/state.reducer';
import * as editorReducer from './state/editor.reducer';

import * as configDetailsActions from '@app/core/state/config-details.actions';
import * as actionRequestsActions from '@app/core/state/action-requests.actions';
import * as historyActions from '@app/core/state/history.actions';
import * as editorActions from './state/editor.actions';
import { ConfigDetails } from '@app/core/models/config-details';


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
    previewModal$: Observable<any>;
    responseModal$: Observable<any>;
    confirmModal$: Observable<any>;

    constructor(protected store: Store<any>, protected route: ActivatedRoute) {
        this.configDetails$ = Observable.empty();
        this.historyRequest$ = Observable.empty();
        this.history$ = Observable.empty();
        this.historySubscription = this.history$.subscribe();
        this.editorMode$ = this.store.select(s => {
            return editorReducer.selectMode(s['editorModule']);
        });
        this.previewModal$ = this.store.select(s => {
            return editorReducer.selectXMLViewModal(s['editorModule']);
        });
        this.responseModal$ = this.store.select(s => {
            return editorReducer.selectResponseModal(s['editorModule']);
        });
        this.confirmModal$ = this.store.select(s => {
            return editorReducer.selectConfirmModal(s['editorModule']);
        });
        this.isEditorModeExpert$ = this.editorMode$.map(val => val === 'expert');
    }

    ngOnInit() {
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
        this.editorMode$.take(1).subscribe(val => {
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
                if (!request.forNewest) {
                    return;
                }
                if (!history.length) {
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

    showXMLFromFields(fields) {
        this.store.dispatch(
            new editorActions.RequestXMLFromFieldsAction({
                path: this.path,
                version: this.selectedVersion,
                fields: fields
            }));
    }

    showFinalXML(event: {xml: string, executive}) {
        this.store.dispatch(
            new editorActions.RequestFinalXMLAction({
                path: this.path,
                version: this.selectedVersion,
                xml: event.xml,
                executive: event.executive
            }));
    }

    submitFields(fields) {

    }

    submitExpertXML(xml, executive) {

    }

    closeModal(name) {
        switch(name) {
        case 'preview': {
            this.store.dispatch(new editorActions.CloseXMLViewModalAction());
        }
        case 'confirm': {
            this.store.dispatch(new editorActions.CloseConfirmModalAction());
        }
        case 'response': {
            this.store.dispatch(new editorActions.CloseResponseModalAction());
        }
        }
    }

}
