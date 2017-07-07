import {
    RequestState, RequestInitiatedState, RequestFailedState,
    RequestCanceledState, RequestSuccessState, RequestNullState
} from '@app/core/models/request-state';
import * as actions from './editor.actions';

export interface State {
    editorMode: 'easy' | 'expert';
}

export const initialState: State = {
    editorMode: 'easy'
};

export function reducer(state = initialState, action: actions.Actions): State {
    switch (action.type) {
    case actions.SWITCH_MODE: {
        return Object.assign({}, state, {editorMode: action.payload});
    }
    default:
        return state;
    }
}

export const selectMode = (state: State) => state.editorMode;
