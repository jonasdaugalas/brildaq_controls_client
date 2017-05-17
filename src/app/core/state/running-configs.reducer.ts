import { RunningDetails } from '../models/running-details';
import {
    RequestState, RequestInitiatedState, RequestFailedState,
    RequestCanceledState, RequestSuccessState, RequestNullState
} from '../models/request-state';
import * as actions from './running-configs.actions';

export interface State {
    ids: string[];
    entities: { [id: string]: RunningDetails };
    rcmsUser: string;
    requestRunning: RequestState;
    requestStates: RequestState;
}

export const initialState: State = {
    ids: [],
    entities: {},
    rcmsUser: '',
    requestRunning: new RequestNullState(),
    requestStates: new RequestNullState()
};

export function reducer(state = initialState, action: actions.Actions): State {
    switch (action.type) {
    case actions.UPDATE: {
        console.log('UPDATE');
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
        console.log('SUCCESS running');
        const newRunning = action.payload.result;
        return Object.assign({}, state, {
            ids: Object.keys(newRunning),
            entities: newRunning,
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
        return Object.assign({}, state, {requestRunning: new RequestCanceledState()});
    }
    case actions.UPDATE_STATES_SUCCESS: {
        console.log('SUCCESS states');
        const newStates = action.payload;
        const newEntities = {};
        state.ids.forEach(key => {
            newEntities[key] = Object.assign(
                {},
                state.entities[key],
                {state: newStates[state.entities[key].URI]}
            );
        });
        return Object.assign({}, state, {
            entities: newEntities,
            requestStates: new RequestSuccessState()
        });
    }
    case actions.UPDATE_STATES_FAILED: {
        console.log(action);
        return Object.assign({}, state, {
            requestRunning: new RequestFailedState(
                action.payload.message, action.payload.error)
        });
    }


    default:
        return state;
    }
}
