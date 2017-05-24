import { NgModule, SkipSelf, Optional } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ClarityModule } from 'clarity-angular';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ConfigurationsEffects } from './state/configurations.effects';
import { RunningConfigsEffects } from './state/running-configs.effects';
import { ConfigDetailsEffects } from './state/config-details.effects';
import { ActionRequestsEffects } from './state/action-requests.effects';
import { reducers } from './state/state.reducer';

import { ConfigurationsService } from './services/configurations.service';
import { AlarmService } from './services/alarm.service';


@NgModule({
    declarations: [],
    imports: [
        HttpModule,
        StoreModule.provideStore(reducers),
        EffectsModule.run(ConfigurationsEffects),
        EffectsModule.run(RunningConfigsEffects),
        EffectsModule.run(ConfigDetailsEffects),
        EffectsModule.run(ActionRequestsEffects),
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
