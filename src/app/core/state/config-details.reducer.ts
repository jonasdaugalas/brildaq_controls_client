import { ConfigDetails } from '../models/config-details';
import {
    RequestState, RequestInitiatedState, RequestFailedState,
    RequestCanceledState, RequestSuccessState, RequestNullState
} from '../models/request-state';
import * as actions from './config-details.actions';

export interface State {
    ids: string[];
    entities: { [id: string]: ConfigDetails };
    requests: { [id: string]: RequestState };
}

export const initialState: State = {
    ids: [],
    entities: {},
    requests: {}
};

export function reducer(state = initialState, action: actions.Actions): State {
    switch (action.type) {
    case actions.REQUEST: {
        console.log('REQUEST');
        const exists = state.ids.indexOf(action.payload.id) > -1;
        const newState = Object.assign({}, state);
        if (!exists) {
            newState.ids = state.ids.slice();
            newState.ids.push(action.payload.id);
            newState.entities = Object.assign({}, state.entities);
            newState.entities[action.payload.id] = undefined;
        }
        newState.requests = Object.assign({}, state.requests);
        newState.requests[action.payload.id] = new RequestInitiatedState();
        return newState;
    }
    case actions.REQUEST_SUCCESS: {
        console.log('SUCCESS');
        const newState = Object.assign({}, state);
        newState.requests = Object.assign({}, state.requests);
        newState.requests[action.payload.id] = new RequestSuccessState();
        newState.entities = Object.assign({}, state.entities);
        newState.entities[action.payload.id] = action.payload.result;
        return newState;
    }
    case actions.REQUEST_FAILED: {
        console.log(action);
        const newState = Object.assign({}, state);
        newState.requests = Object.assign({}, state.requests);
        newState.requests[action.payload.id] = new RequestFailedState(
            action.payload.message, action.payload.error);
        return newState;
    }
    default:
        return state;
    }
}
