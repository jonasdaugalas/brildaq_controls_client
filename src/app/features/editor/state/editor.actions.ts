import { Action } from '@ngrx/store';

export const SWITCH_MODE = '[Editor] SWITCH_MODE';

export class SwitchModeAction implements Action {
    readonly type = SWITCH_MODE;

    constructor(public payload: string) {};
}

export type Actions
    = SwitchModeAction;
