import { Configuration } from '../models/configuration';
import * as configs from './configurations.actions';

export interface State {
    ids: string[];
    entities: { [id: string]: Configuration };
    loading: boolean;
    loaded: boolean;
    loadMessage: string;
    error: any;
}

export const initialState: State = {
    ids: [],
    entities: {},
    loading: false,
    loaded: false,
    loadMessage: '',
    error: null
};

export function reducer(state = initialState, action: configs.Actions): State {
    switch (action.type) {
    case configs.UPDATE: {
        console.log('UPDATE');
        return Object.assign({}, state, {
            loading: true,
            loaded: false,
            loadMessage: 'Waiting',
            error: null
        });
    }
    case configs.UPDATE_SUCCESS: {
        console.log('SUCCESS');
        const newConfigs = action.payload;
        return {
            ids: Object.keys(newConfigs),
            entities: newConfigs,
            loading: false,
            loaded: true,
            loadMessage: 'OK',
            error: null
        };
    }
    case configs.UPDATE_FAILED: {
        console.log('FAIL');
        return Object.assign({}, state, {
            loading: false,
            loaded: false,
            loadMessage: action.message,
            error: action.payload
        });
    }
    default:
        return state;
    }
}

export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;
