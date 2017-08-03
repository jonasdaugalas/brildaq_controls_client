import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClarityModule } from 'clarity-angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRouting } from './app.routing';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { AlertsComponent } from './alerts/alerts.component';
import * as appReducer from './state/app.reducer';
import { AppEffects } from './state/app.effects';

@NgModule({
    declarations: [
        AppComponent,
        AlertsComponent,
    ],
    imports: [
        BrowserModule,
        ClarityModule.forChild(),
        AppRouting,
        StoreModule.forFeature('appModule', appReducer.reducer),
        EffectsModule.forFeature([
            AppEffects
        ]),
        CoreModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
