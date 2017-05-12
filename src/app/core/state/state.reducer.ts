import { ActionReducer, combineReducers } from '@ngrx/store';
import * as configsReducer from './configurations.reducer';

export interface State {
    configs: configsReducer.State;
}

export const reducers = {
    configs: configsReducer.reducer
}

// export function reducer() {
//     return combineReducers(reducers);
// }
