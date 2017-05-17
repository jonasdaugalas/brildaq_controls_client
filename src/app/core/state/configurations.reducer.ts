import { Configuration } from '../models/configuration';
import {
    RequestState, RequestCanceledState, RequestFailedState,
    RequestInitiatedState, RequestSuccessState, RequestNullState
} from '../models/request-state';
import * as configs from './configurations.actions';

export interface State {
    ids: string[];
    entities: { [id: string]: Configuration };
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
        console.log('UPDATE');
        return Object.assign({}, state, {
            request: new RequestInitiatedState()
        });
    }
    case configs.UPDATE_SUCCESS: {
        console.log('SUCCESS');
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

export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;
