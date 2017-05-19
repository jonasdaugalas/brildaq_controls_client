import { RunningDetails } from '../models/running-details';
import {
    RequestState, RequestInitiatedState, RequestFailedState,
    RequestCanceledState, RequestSuccessState, RequestNullState
} from '../models/request-state';
import * as actions from './running-configs.actions';

export interface State {
    ids: string[];
    running: { [id: string]: RunningDetails };
    states: { [id: string]: string };
    rcmsUser: string;
    requestRunning: RequestState;
    requestStates: RequestState;
}

export const initialState: State = {
    ids: [],
    running: {},
    states: {},
    rcmsUser: '',
    requestRunning: new RequestNullState(),
    requestStates: new RequestNullState()
};

export function reducer(state = initialState, action: actions.Actions): State {
    switch (action.type) {
    case actions.UPDATE: {
        console.log('UPDATE RUNNING');
        return Object.assign({}, state, {
            requestRunning: new RequestInitiatedState()
        });
    }
    case actions.UPDATE_CANCEL: {
        console.log('UPDATE_CANCEL');
        return Object.assign({}, state, {
            requestRunning: new RequestCanceledState()
        });
    }
    case actions.UPDATE_SUCCESS: {
        console.log('SUCCESS running', action.payload);
        const newRunning = action.payload.result;
        return Object.assign({}, state, {
            ids: Object.keys(newRunning),
            running: newRunning,
            rcmsUser: action.payload.rcmsUser,
            requestRunning: new RequestSuccessState()
        });
    }
    case actions.UPDATE_FAILED: {
        console.log(action);
        return Object.assign({}, state, {
            requestRunning: new RequestFailedState(
                action.payload.message, action.payload.error)
        });
    }

    case actions.UPDATE_STATES: {
        console.log('UPDATE_STATES');
        return Object.assign({}, state, {requestStates: new RequestInitiatedState()});
    }
    case actions.UPDATE_STATES_CANCEL: {
        console.log('UPDATE_STATES_CANCEL');
        return Object.assign({}, state, {requestStates: new RequestCanceledState()});
    }
    case actions.UPDATE_STATES_SUCCESS: {
        console.log('SUCCESS states', action.payload);
        const newStates = {};
        state.ids.forEach(id => {
            newStates[id] = action.payload[state.running[id].URI]
        });
        return Object.assign({}, state, {
            states: newStates,
            requestStates: new RequestSuccessState()
        });
    }
    case actions.UPDATE_STATES_FAILED: {
        console.log(action);
        return Object.assign({}, state, {
            requestStates: new RequestFailedState(
                action.payload.message, action.payload.error)
        });
    }


    default:
        return state;
    }
}

export const selectIds = (state: State) => state.ids;
export const selectRunning = (state: State) => state.running;
export const selectStates = (state: State) => state.states;
export const selectRequestRunning = (state: State) => state.requestRunning;
export const selectRequestStates = (state: State) => state.requestStates;
