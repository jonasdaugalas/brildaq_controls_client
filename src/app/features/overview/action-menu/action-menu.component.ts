import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import * as appState from '@app/core/state/state.reducer';
import * as actionRequestsActions from '@app/core/state/action-requests.actions';
import { ActionRequest } from '@app/core/models/action-request';
import * as CONTROL_ACTIONS from '@app/core/models/control-actions';
import { STATES as CONFIG_STATES } from '@app/core/models/running-details';

@Component({
  selector: 'config-action-menu',
  templateUrl: './action-menu.component.html'
})
export class ActionMenuComponent implements OnInit {

    name: string;
    disabledActionButton = {
        turnon: false,
        turnoff: false,
        reset: false,
        create: false,
        destroy: false
    };

    protected _path;
    @Input() set path(newPath: string) {
        this._path = newPath;
        this.name = newPath.split('/').pop();
    }
    get path(): string {
        return this._path;
    }

    protected _actionRequest: ActionRequest;
    @Input() set actionRequest(newActionRequest) {
        this._actionRequest = newActionRequest;
        this.updateButtonDisables();
    }

    @Input() state: string;

    @Output() onAction = new EventEmitter();

    constructor(protected store: Store<appState.State>) {};

    ngOnInit() {
    }

    updateButtonDisables() {
        console.log('updateButtonDisables');
        if (this._actionRequest && this._actionRequest.state.loading) {
            Object.keys(this.disabledActionButton).forEach(key => {
                this.disabledActionButton[key] = true;
            });
        } else {
            Object.keys(this.disabledActionButton).forEach(key => {
                this.disabledActionButton[key] = false;
            });
        }
    }

    sendTurnON() {
        this.sendAction(CONTROL_ACTIONS.TURN_ON);
    }

    sendTurnOFF() {
        this.sendAction(CONTROL_ACTIONS.TURN_OFF);
    }

    sendReset() {
        this.sendAction(CONTROL_ACTIONS.RESET);
    }

    sendCreate() {
        this.sendAction(CONTROL_ACTIONS.CREATE_FM);
    }

    sendDestroy() {
        this.sendAction(CONTROL_ACTIONS.DESTROY_FM);
    }

    protected sendAction(action) {
        this.store.dispatch(new actionRequestsActions.SendActionAction(
            {configId: this._path, actionType: action}));
    }

}
