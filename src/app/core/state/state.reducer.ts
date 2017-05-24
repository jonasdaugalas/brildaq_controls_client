import { ActionReducer, combineReducers } from '@ngrx/store';
import * as configsReducer from './configurations.reducer';
import * as runningReducer from './running-configs.reducer';
import * as configDetailsReducer from './config-details.reducer';
import * as actionRequestsReducer from './action-requests.reducer';

export interface State {
    configs: configsReducer.State;
    running: runningReducer.State;
    configDetails: configDetailsReducer.State;
    actionRequests: actionRequestsReducer.State;
}

export const reducers = {
    configs: configsReducer.reducer,
    running: runningReducer.reducer,
    configDetails: configDetailsReducer.reducer,
    actionRequests: actionRequestsReducer.reducer
}

export const selectConfigsIds = state => configsReducer.selectIds(state.configs);
export const selectConfigsEntities = state => configsReducer.selectEntities(state.configs);
export const selectConfigsRequest = state => configsReducer.selectRequest(state.configs);

export const selectRunningIds = state => runningReducer.selectIds(state.running);
export const selectRunningEntities = state => runningReducer.selectRunning(state.running);
export const selectRunningStates = state => runningReducer.selectStates(state.running);
export const selectRunningRequest = state => runningReducer.selectRequestRunning(state.running);
export const selectRunningRequestStates = state => runningReducer.selectRequestStates(state.running);

export const selectConfigDetailsIds = state => configDetailsReducer.selectIds(state.configDetails);
export const selectConfigDetailsEntities = state => configDetailsReducer.selectEntities(state.configDetails);
export const selectConfigDetailsRequests = state => configDetailsReducer.selectRequests(state.configDetails);

export const selectActionRequests = state => actionRequestsReducer.selectRequests(state.actionRequests);
