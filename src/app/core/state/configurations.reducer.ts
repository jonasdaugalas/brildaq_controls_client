import { createSelector } from 'reselect';
import { Configuration } from '../models/configuration';
import {
    RequestState, RequestCanceledState, RequestFailedState,
    RequestInitiatedState, RequestSuccessState, RequestNullState
} from '../models/request-state';
import * as configs from './configurations.actions';

export interface State {
    ids: Array<string>;
    entities: { string: Configuration } | {};
    request: RequestState;
}

export const initialState: State = {
    ids: [],
    entities: {},
    request: new RequestNullState()
};

export function reducer(state = initialState, action: configs.Actions): State {
    switch (action.type) {
    case configs.UPDATE: {
        console.log('UPDATE CONFIGS');
        return Object.assign({}, state, {
            request: new RequestInitiatedState()
        });
    }
    case configs.UPDATE_SUCCESS: {
        console.log('SUCCESS', action.payload);
        const newConfigs = action.payload;
        return {
            ids: Object.keys(newConfigs),
            entities: newConfigs,
            request: new RequestSuccessState()
        };
    }
    case configs.UPDATE_FAILED: {
        console.log(action);
        return Object.assign({}, state, {
            request: new RequestFailedState(
                action.payload.message, action.payload.error)
        });
    }
    default:
        return state;
    }
}

export const selectIds = (state: State) => state.ids;
export const selectEntities = (state: State) => state.entities;
export const selectRequest = (state: State) => state.request;
