import { ActionReducer, combineReducers } from '@ngrx/store';
import * as configsReducer from './configurations.reducer';
import * as runningReducer from './running-configs.reducer';
import * as configDetailsReducer from './config-details.reducer';

export interface State {
    configs: configsReducer.State;
    running: runningReducer.State;
    configDetails: configDetailsReducer.State;
}

export const reducers = {
    configs: configsReducer.reducer,
    running: runningReducer.reducer,
    configDetails: configDetailsReducer.reducer
}
