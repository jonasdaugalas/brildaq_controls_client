import { ActionReducer, Action } from '@ngrx/store';
import { Configuration } from '@app/shared/models/configuration';
import { Alarm } from '@app/shared/models/alarm';

export interface AppState {
    profile: string;
    rcmsUsers: Array<string>;
    rcmsUser: string;
    userName: string;
    configurations: Array<Configuration>;
    alarm: Alarm;
}

export const appStateReducers = {
    profile: profileReducer,
    rcmsUsers: rcmsUsersReducer,
    rcmsUser: rcmsUserReducer,
    userName: userNameReducer,
    configurations: configurationsReducer,
    alarm: alarmReducer
};

export const CONFIGURATIONS_UPDATE = 'CONFIGURATIONS_UPDATE';
export const RUNNINGS_UPDATE = 'RUNNINGS_UPDATE';
export const PROFILE_SET = 'PROFILE_SET';
export const RCMS_USERS_SET = 'RCMS_USERS_SET';
export const RCMS_USER_SET = 'RCMS_USER_SET';
export const USERNAME_SET = 'USERNAME_SET';

export class AlarmActions {
    static STARTED = 'alarm:STARTED';
    static ENDED = 'alarm:ENDED';
    static TOGGLE_MUTE = 'alarm:TOGGLE_MUTE';
    static MUTE = 'alarm:MUTE';
    static UNMUTE = 'alarm:UNMUTE';
};

export function profileReducer(state: string, action: Action) {
    switch (action.type) {
    case PROFILE_SET:
        console.log('setting profile');
        return action.payload;
    default:
        return state;
    }
}

export function rcmsUsersReducer(state: Array<string> = [], action: Action) {
    switch (action.type) {
    case RCMS_USERS_SET:
        console.log('setting rcms users');
        return action.payload;
    default:
        return state;
    }
}

export function rcmsUserReducer(state: string, action: Action): string {
    switch (action.type) {
    case RCMS_USER_SET:
        return action.payload;
    default:
        return state;
    }
}

export function userNameReducer(state: string, action: Action) {
    switch (action.type) {
    case USERNAME_SET:
        console.log('setting username');
        return action.payload;
    default:
        return state;
    }
}
export function configurationsReducer(state: Array<Configuration> = [], action: Action) {
    switch (action.type) {
    case CONFIGURATIONS_UPDATE:
        return action.payload;
    case RUNNINGS_UPDATE:
        return action.payload;
    default:
        return state;
    }
}

export const defaultAlarmState: Alarm = {
    muted: false,
    isPlaying: false
};

export function alarmReducer(state: Alarm = defaultAlarmState,
                             action: Action): Alarm {
    switch (action.type) {
    case AlarmActions.STARTED:
        return Object.assign({}, state, {isPlaying: true});
    case AlarmActions.ENDED:
        return Object.assign({}, state, {isPlaying: false});
    case AlarmActions.TOGGLE_MUTE:
        return Object.assign({}, state, {muted: !state.muted});
    case AlarmActions.MUTE:
        return Object.assign({}, state, {muted: true});
    case AlarmActions.UNMUTE:
        return Object.assign({}, state, {muted: false});
    default:
        return state;
    }
}
