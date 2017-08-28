import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from 'clarity-angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRouting } from './app.routing';
import { CoreModule } from './core/core.module';

import { AppService } from './services/app.service';
import { AppComponent } from './app.component';
import { AlertsComponent } from './alerts/alerts.component';
import * as appReducer from './state/app.reducer';
import { AppEffects } from './state/app.effects';
import { ModalsComponent } from './modals/modals.component';
import { NameCookieModalComponent } from './modals/name-cookie-modal/name-cookie-modal.component';
import { TestModalComponent } from './modals/test-modal/test-modal.component';
import { AppRefreshModalComponent } from './modals/app-refresh-modal/app-refresh-modal.component';

@NgModule({
    declarations: [
        AppComponent,
        AlertsComponent,
        ModalsComponent,
        NameCookieModalComponent,
        AppRefreshModalComponent,
        TestModalComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        BrowserModule,
        ClarityModule.forChild(),
        AppRouting,
        StoreModule.forFeature('appModule', appReducer.reducer),
        EffectsModule.forFeature([
            AppEffects
        ]),
        CoreModule
    ],
    providers: [
        AppService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
