import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

import { Alert, AlertActionNames } from './models/alert';
import { Store } from '@ngrx/store';
import * as appState from '@app/core/state/state.reducer';
import * as appReducer from './state/app.reducer';

import * as appActions from './state/app.actions';
import * as configsActions from './core/state/configurations.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

    alerts$: Observable<Array<Alert>>;

    constructor(private store: Store<appState.State>) {
        console.log('CONSTRUCT app');
        this.alerts$ = this.store.select(state => {
            return appReducer.selectAlertsEntities(state['appModule']);
        });

    }

    ngOnInit() {
        console.log('APP INIT');

        // NOTE: ngrx store has a problem https://github.com/ngrx/platform/issues/133
        // until the problem is fixed, we cannot dispatch actions between two
        // ngrx stre initializations, because after the second one is
        // initialized, the action is handled once more.
        // Workaround: dispatch actions only when all stores are initialized
        if (document.cookie.indexOf('clientname') < 0) {
            setTimeout(this.pushNameCookieAlert.bind(this), 2000);
        }

    }

    ngAfterViewInit() {
    }

    handleAlert(event: {alert: Alert, actionName: AlertActionNames}) {
        this.store.dispatch(new appActions.HandleAlertAction({
            alert: event.alert,
            actionName: event.actionName
        }));
    }

    pushNameCookieAlert() {
        this.store.dispatch(new appActions.AddAlertAction({
            type: 'info',
            text: 'Would you mind setting your name into a cookie? It would be associated with your actions in server logs.',
            closable: true,
            actions: {
                closeAction: {action: null, text: ''},
                firstAction: {action: null, text: 'Set name'},
                secondAction: {action: null, text: 'Hide this'}
            }
        }));
    }

}
