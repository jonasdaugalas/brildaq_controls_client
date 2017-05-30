import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClarityModule } from 'clarity-angular';

import { AppRouting } from './app.routing';
import { CoreModule } from './core/core.module';
// import { OverviewModule } from '@app/features/overview/overview.module';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        CoreModule,
        // OverviewModule,
        // ClarityModule.forRoot(),
        AppRouting
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
