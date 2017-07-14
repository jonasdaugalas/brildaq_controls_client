import { Component, OnInit, OnDestroy } from '@angular/core';
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
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<void> = new Subject<void>();

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
    // TODO: make selectedRcmsUser observable (in local store of the overview module)
    rcmsUsers = ['lumipro', 'lumidev'];
    selectedRcmsUser$: BehaviorSubject<string> = new BehaviorSubject<string>('lumipro');

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
    }

    ngOnInit() {

        console.log('INIT overview');
        // this.refresh();

        this.isLoading$ = this.configurationsRequest$
            .combineLatest(this.runningDetailsRequest$, this.runningStatesRequest$)
            .map(([cfgReq, runningReq, statesReq]) => {
                return cfgReq.loading || runningReq.loading || statesReq.loading;
            });

        this.userConfigurationIds$ = this.selectedRcmsUser$
            .combineLatest(this.configurationIds$)
            .map(([user, ids]) => {
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
                console.log(activeIds);
                const running = combination[1];
                this.updateConfigDetails(activeIds, running);
            });

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
        this.selectedRcmsUser$.next(newUser);
        this.updateStates();
    }

    filterActiveStates(states) {
        return Object.keys(states).filter(key => {
            if (states[key] === RUNNING_STATES.ON ||
                states[key] === RUNNING_STATES.ERROR) {
                return true;
            }
        });
    }

    updateConfigs() {
        this.store.dispatch(new configsActions.UpdateAction());
    }

    updateStates() {
        this.selectedRcmsUser$.take(1).subscribe(user => {
            this.store.dispatch(new runningActions.UpdateAction(user));
        });
    }

    updateConfigDetails(activeIds, running) {
        console.log('in overview updateConfigDetails', activeIds, running);
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
