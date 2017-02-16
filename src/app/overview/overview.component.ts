import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
    AppState, CONFIGURATIONS_UPDATE, RCMS_USERS_SET, RCMS_USER_SET
} from '@app/shared/models/app-state';
// import { AlarmService } from '@app/shared/services/alarm.service';
import { Alarm } from '@app/shared/models/alarm';
import { Configuration, ConfigurationStates } from '@app/shared/models/configuration';
import { ConfigurationsService } from '@app/shared/services/configurations.service';

@Component({
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

    configurations: Observable<Array<Configuration>>;
    owners: Observable<Array<string>>;
    owner: Observable<string>;
    alarm: Observable<Alarm>;

    constructor(
        private store: Store<AppState>,
        private configsService: ConfigurationsService,
        // private alarmService: AlarmService
    ) {}

    ngOnInit() {
        this.configurations = this.store.select(state => state.configurations);
        this.owner = this.store.select(state => state.rcmsUser);
        this.owners = this.store.select(state => state.rcmsUsers);
        this.alarm = this.store.select(state => state.alarm);

        this.store.dispatch({
            type: CONFIGURATIONS_UPDATE,
            payload: [{
                path: '/dip/global/analyzer1',
                state: 'ON'
            }, {
                path: '/dip/global/alarms',
                state: 'ON'
            }, {
                path: '/dip/global/dipprocessor',
                state: 'ON'
            }, {
                path: '/central/global/lumistore',
                state: 'OFF'
            }, {
                path: '/central/global/asdfsdf',
                state: 'TURNING_ON'
            }, {
                path: '/central/global/bestLumiProcessor',
                state: 'ERROR'
            }, {
                path: '/plt/global/pltsource',
                state: 'FM_OFF'
            }, {
                path: '/plt/global/pltprocessor',
                state: 'ON'
            }]
        });
        this.store.dispatch({
            type: RCMS_USERS_SET,
            payload: ['lumipro', 'lumidev']
        });
        this.ownerChanged('lumipro');

    }

    // refresh() {
    //     this.configurations[0]['state'] = (
    //         this.configurations[0]['state'] === 'ON' ? 'OFF' : 'ON');
    // }

    ownerChanged(newOwner) {
        this.store.dispatch({
            type: RCMS_USER_SET,
            payload: newOwner
        });
    }

}
