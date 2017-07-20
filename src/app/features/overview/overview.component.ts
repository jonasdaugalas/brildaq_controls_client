import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import { Store } from '@ngrx/store';
import * as appState from '@app/core/state/state.reducer';
import * as APP_CONFIG from '@app/../app-config-constants';

import * as configsActions from '@app/core/state/configurations.actions';
import * as runningActions from '@app/core/state/running-configs.actions';
import * as configDetailsActions from '@app/core/state/config-details.actions';
import * as actionRequestsActions from '@app/core/state/action-requests.actions';
import * as overviewActions from './state/overview.actions';
import * as overviewReducer from './state/overview.reducer';
import { Configuration } from '@app/core/models/configuration';
import { RunningDetails, STATES as CONFIG_STATES } from '@app/core/models/running-details';
import { ConfigDetails } from '@app/core/models/config-details';
import {
    RequestState, RequestInitiatedState, RequestFailedState
} from '@app/core/models/request-state';
import { ActionRequest } from '@app/core/models/action-request';

@Component({
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<void> = new Subject<void>();
    protected unstableStatesUpdateTimeoutID;

    configurationIds$: Observable<Readonly<Array<string>>>;
    configurations$: Observable<{string: Configuration} | {}>;
    configurationsRequest$: Observable<RequestState>;
    userConfigurationIds$: Observable<Array<string>>;

    runningDetails$: Observable<{string: RunningDetails} | {}>;
    runningDetailsRequest$: Observable<RequestState>;
    runningStates$: Observable<{string: string} | {}>;
    runningStatesRequest$: Observable<RequestState>;

    actionRequests$: Observable<{string: ActionRequest} | {}>;

    activeConfigIds$: Observable<Array<string>>;

    configDetails$: Observable<{string: ConfigDetails} | {}>;

    isLoading$: Observable<boolean>;
    requestsFailing$: Observable<boolean>;

    rcmsUsers = ['lumipro', 'lumidev'];
    selectedRCMSUser$: Observable<string>;

    constructor(private store: Store<appState.State>) {
        console.log('CONSTRUCT overview');
        this.configurations$ = this.store.select(appState.selectConfigsEntities);
        this.configurationIds$ = this.store.select(appState.selectConfigsIds);
        this.configurationsRequest$ = this.store.select(appState.selectConfigsRequest);
        this.runningDetails$ = this.store.select(appState.selectRunningEntities);
        this.runningDetailsRequest$ = this.store.select(appState.selectRunningRequest);
        this.runningStates$ = this.store.select(appState.selectRunningStates);
        this.runningStatesRequest$ = this.store.select(appState.selectRunningRequestStates);
        this.configDetails$ = this.store.select(appState.selectConfigDetailsEntities);
        this.actionRequests$ = this.store.select(appState.selectActionRequests);
        this.selectedRCMSUser$ = this.store.select(state => {
            return overviewReducer.selectRCMSUser(state['overviewModule']);
        });
    }

    ngOnInit() {
        console.log('INIT overview');

        this.requestsFailing$ = this.configurationsRequest$
            .combineLatest(this.runningDetailsRequest$, this.runningStatesRequest$)
            .debounceTime(400)
            .map(([cfgReq, runningReq, statesReq]) => {
                const failing = cfgReq instanceof RequestFailedState ||
                    runningReq instanceof RequestFailedState ||
                    statesReq instanceof RequestFailedState;
                console.log('FAILING?', failing);
                return failing;
            });

        this.isLoading$ = this.configurationsRequest$
            .combineLatest(this.runningDetailsRequest$, this.runningStatesRequest$)
            .map(([cfgReq, runningReq, statesReq]) => {
                return cfgReq instanceof RequestInitiatedState ||
                    runningReq instanceof RequestInitiatedState ||
                    statesReq instanceof RequestInitiatedState;
            });

        this.userConfigurationIds$ = this.selectedRCMSUser$
            .combineLatest(this.configurationIds$)
            .map(([user, ids]) => {
                console.log('update userConfigurationIds$', user, ids);
                return ids.filter(val => {
                    return val.startsWith('/' + user);
                });
            });

        this.activeConfigIds$ = this.runningStates$
            .takeUntil(this.ngUnsubscribe)
            .map(this.filterActiveStates.bind(this));

        this.activeConfigIds$
            .withLatestFrom(this.runningDetails$)
            .takeUntil(this.ngUnsubscribe)
            .subscribe(combination => {
                const activeIds = combination[0];
                const running = combination[1];
                this.updateConfigDetails(activeIds, running);
            });

        Observable.interval(APP_CONFIG.AUTOUPDATE_INTERVAL)
            .takeUntil(this.ngUnsubscribe)
            .withLatestFrom(this.configurationIds$)
            .subscribe(([counter, ids]) => {
                console.log(counter, ids);
                if (counter % 10 === 9 || ids.length === 0) {
                    this.refresh();
                } else {
                    this.updateStates();
                }
            });

        this.actionRequests$
            .takeUntil(this.ngUnsubscribe)
            .subscribe(requests => {
                const waiting = Object.keys(requests).filter(key => {
                    if (requests[key].state instanceof RequestInitiatedState) {
                        return true;
                    } else {
                        return false;
                    }
                });
                console.log('waiting', waiting);
                if (waiting.length === 0) {
                    this.updateStates();
                }
            });

        this.runningStates$
            .takeUntil(this.ngUnsubscribe)
            .subscribe(val => {
                console.log('checking running states for unstable');
                const hasUnstableStates = Object.keys(val).some(key => {
                    return !CONFIG_STATES.stateIsStable(val[key]);
                });
                if (hasUnstableStates) {
                    clearTimeout(this.unstableStatesUpdateTimeoutID);
                    this.unstableStatesUpdateTimeoutID =  setTimeout(
                        this.updateStates.bind(this),
                        APP_CONFIG.UPDATE_UNSTABLE_STATES_INTERVAL);
                }
            });

        this.refresh();
    }

    ngOnDestroy() {
        console.log('DESTROYING overview');
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    refresh() {
        this.updateConfigs();
        this.updateStates();
    }

    selectRcmsUser(newUser: string) {
        this.store.dispatch(new overviewActions.SelectRCMSUserAction(newUser));
        this.updateStates();
    }

    filterActiveStates(states) {
        return Object.keys(states).filter(key => {
            if (states[key] === CONFIG_STATES.ON ||
                states[key] === CONFIG_STATES.ERROR) {
                return true;
            }
        });
    }

    updateConfigs() {
        console.log('dispatching configurations update');
        this.store.dispatch(new configsActions.UpdateAction());
    }

    updateStates() {
        this.selectedRCMSUser$.take(1).subscribe(user => {
            this.store.dispatch(new runningActions.UpdateAction(user));
        });
    }

    updateConfigDetails(activeIds, running) {
        this.configDetails$.take(1).subscribe((cfgDetails) => {
            const detailsIds = []
            activeIds.forEach(runningId => {
                const detailsId = runningId + '/v=' + running[runningId].version;
                if (!cfgDetails.hasOwnProperty(detailsId)) {
                    detailsIds.push(detailsId);
                }
            });
            detailsIds.forEach(val => {
                this.store.dispatch(new configDetailsActions.RequestAction({id: val, withXML: false}));
            });
        });
    }

}
