import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '@app/core/state/state.reducer';
import * as configsActions from '@app/core/state/configurations.actions';
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
