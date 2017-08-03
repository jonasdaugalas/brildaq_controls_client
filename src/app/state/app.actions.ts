import { Action } from '@ngrx/store';
import { Alert, AlertActionNames } from '../models/alert';

export const ADD_ALERT = '[App] ADD_ALERT';
export const HANDLE_ALERT = '[App] HANDLE_ALERT';

export class AddAlertAction implements Action {
    readonly type = ADD_ALERT;

    constructor(public payload: Alert) {};
}

export class HandleAlertAction implements Action {
    readonly type = HANDLE_ALERT;

    constructor(public payload: {alert: Alert, actionName: AlertActionNames}) {};
}

export type Actions = AddAlertAction | HandleAlertAction;
