import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable, Subject, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/debounceTime';

import * as APP_CONFIG from '@app/../app-config-constants';
import * as appState from '@app/core/state/state.reducer';
import { RoutedEditorComponent } from '../routed-editor/routed-editor.component';
import { ConfigurationsService } from '../../core/services/configurations.service';
import { STATES } from '@app/core/models/running-details';
import { ActionRequest } from '@app/core/models/action-request';

@Component({
    selector: 'bc-standalone',
    templateUrl: './standalone.component.html',
    styleUrls: ['./standalone.component.css']
})
export class StandaloneComponent extends RoutedEditorComponent implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<void> = new Subject<void>();
    @ViewChild('editor') editor;
    state: string;
    stateIcon: string;
    stateIconClass: string;
    stateSpinner: boolean;
    unstableStateUpdateTimeoutID = null;
    actionRequests$: Observable<{string: ActionRequest} | {}>;


    constructor(
        protected route: ActivatedRoute,
        protected configService: ConfigurationsService,
        private store: Store<appState.State>)
    {
        super(route);
        this.actionRequests$ = this.store.select(appState.selectActionRequests);
    }

    ngOnInit() {
        super.ngOnInit();
        this.updateState();

        Observable.interval(29000)
            .takeUntil(this.ngUnsubscribe)
            .subscribe((counter) => {
                this.updateState();
                if (counter % 60 === 59) {
                    this.updateEditor();
                }
            });

        this.actionRequests$
            .takeUntil(this.ngUnsubscribe)
            .skip(1) // skip initial value, not necessary, but to avoid useless update
            .subscribe(requests => {
                console.log('actionRequests', requests);
                this.updateState();
            });

    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    unstableStateUpdate() {
        console.log('unstableStateUpdate');
        clearTimeout(this.unstableStateUpdateTimeoutID);
        this.unstableStateUpdateTimeoutID = setTimeout(
            this.updateState.bind(this),
            APP_CONFIG.UPDATE_UNSTABLE_STATES_INTERVAL);
    }

    updateState() {
        this.configService.getState(this.path).subscribe(resp => {
            this.setState(resp);
            if (!STATES.stateIsStable(resp)) {
                this.unstableStateUpdate();
            }
        }, err => {
            this.configService.getConfigs().subscribe(resp => {
                if (resp.hasOwnProperty(this.path)) {
                    this.setState(STATES.NO_FM);
                } else {
                    this.setState(STATES.UNKNOWN);
                }
            }, err => {
                this.setState(STATES.UNKNOWN);
            });
        })
    }

    updateEditor() {
        this.editor.reselectWorkingConfiguration();
    }

    refresh() {
        this.updateEditor();
        this.updateState();
    }

    setState(newState: string) {
        this.state = newState;
        this.stateSpinner = false;
        switch (newState) {
        case STATES.NO_FM:
            this.stateIcon = 'document';
            this.stateIconClass = 'is-solid';
            break;
        case STATES.ON:
            this.stateIcon = 'heart';
            this.stateIconClass = 'is-solid is-success';
            break;
        case STATES.OFF:
            this.stateIcon = 'cog';
            this.stateIconClass = 'is-solid is-info';
            break;
        case STATES.ERROR:
            this.stateIcon = 'error';
            this.stateIconClass = 'is-solid is-error';
            break;
        case STATES.RESETTING:
        case STATES.TURNING_ON:
        case STATES.TURNING_OFF:
            this.stateIcon = null;
            this.stateIconClass = '';
            this.stateSpinner = true;
            break;
        default:
            this.state = STATES.UNKNOWN;
            this.stateIcon = 'warning';
            this.stateIconClass = 'is-solid is-warning';
        }

    }

}
