import { NgModule, SkipSelf, Optional } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ClarityModule } from 'clarity-angular';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ConfigurationsEffects } from './state/configurations.effects';
import { RunningConfigsEffects } from './state/running-configs.effects';
import { ConfigDetailsEffects } from './state/config-details.effects';
import { ActionRequestsEffects } from './state/action-requests.effects';
import { HistoryEffects } from './state/history.effects';
import { reducers, makeLoggingReducer } from './state/state.reducer';

import { ConfigurationsService } from './services/configurations.service';
import { AlarmService } from './services/alarm.service';


@NgModule({
    declarations: [],
    imports: [
        HttpModule,
        StoreModule.forRoot(reducers, { metaReducers: [makeLoggingReducer] }),
        EffectsModule.forRoot([
            ConfigurationsEffects,
            RunningConfigsEffects,
            ConfigDetailsEffects,
            ActionRequestsEffects,
            HistoryEffects,
        ]),
        StoreDevtoolsModule.instrument({
            maxAge: 5
        }),
        ClarityModule.forRoot()
    ],
    providers: [
        ConfigurationsService,
        AlarmService
    ],
})
export class CoreModule {

    constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}
