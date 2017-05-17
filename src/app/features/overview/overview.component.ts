import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '@app/core/state/state.reducer';
import * as configsActions from '@app/core/state/configurations.actions';
import * as runningActions from '@app/core/state/running-configs.actions';
import * as configDetailsActions from '@app/core/state/config-details.actions';
import { Configuration } from '@app/core/models/configuration';

@Component({
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

    configurations: Observable<Array<Configuration>>;
    owners: Observable<Array<string>>;
    owner: Observable<string>;

    constructor(private store: Store<State>) {}

    ngOnInit() {
        this.store.dispatch(new configsActions.UpdateAction());
        this.store.dispatch(new runningActions.UpdateAction('lumipro'));
        let configs;
        const state$ = this.store.select(state => state);
        const state_sub = state$.subscribe((val) => {
            console.log(val);
            configs = val.configs;
        })
        setTimeout(() => {
            const configId = configs.ids[0];
            const version = configs.entities[configId].version;
            const configDetailsId = configId + '/v=' + version;
            this.store.dispatch(new configDetailsActions.RequestAction({id: configDetailsId}));
        }, 2000);
        setTimeout(() => {
            state_sub.unsubscribe();
        }, 3000);

        // this.configurations = this.store.select(state => state.configurations);
        // this.owner = this.store.select(state => state.rcmsUser);
        // this.owners = this.store.select(state => state.rcmsUsers);

        // this.store.dispatch({
        //     type: CONFIGURATIONS_UPDATE,
        //     payload: [{
        //         path: '/dip/global/analyzer1',
        //         state: 'ON'
        //     }, {
        //         path: '/central/global/lumistore',
        //         state: 'OFF'
        //     }, {
        //         path: '/central/global/asdfsdf',
        //         state: 'TURNING_ON'
        //     }, {
        //         path: '/central/global/bestLumiProcessor',
        //         state: 'ERROR'
        //     }, {
        //         path: '/plt/global/pltsource',
        //         state: 'FM_OFF'
        //     }, {
        //         path: '/dip/global/alarms',
        //         state: 'ON'
        //     }, {
        //         path: '/dip/global/dipprocessor',
        //         state: 'ON'
        //     }, {
        //         path: '/plt/global/pltprocessor',
        //         state: 'ON'
        //     }]
        // });
        // this.store.dispatch({
        //     type: RCMS_USERS_SET,
        //     payload: ['lumipro', 'lumidev']
        // });
        // this.ownerChanged('lumipro');

    }

    // refresh() {
    //     this.configurations[0]['state'] = (
    //         this.configurations[0]['state'] === 'ON' ? 'OFF' : 'ON');
    // }

    ownerChanged(newOwner) {
        // this.store.dispatch({
        //     type: RCMS_USER_SET,
        //     payload: newOwner
        // });
    }

}
