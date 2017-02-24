import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClarityModule } from 'clarity-angular';
import { StoreModule } from '@ngrx/store';

import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { OverviewComponent } from './overview/overview.component';
import { OverviewHeaderComponent } from './overview/overview-header/overview-header.component';
import { OverviewTreeComponent } from './overview/overview-tree/overview-tree.component';
import { OverviewActivePanelComponent } from './overview/overview-active-panel/overview-active-panel.component';
import { TreeNodeComponent } from './overview/overview-tree/tree-node/tree-node.component';

import { AppConfigurationService } from './shared/services/app-configuration.service';
import { ConfigurationsService } from './shared/services/configurations.service';
import { AlarmService } from './shared/services/alarm.service';
import { appStateReducers } from './shared/models/app-state';
import { ActionMenuComponent } from './overview/action-menu/action-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    OverviewHeaderComponent,
    OverviewTreeComponent,
    OverviewActivePanelComponent,
    TreeNodeComponent,
    ActionMenuComponent
  ],
  imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      ClarityModule.forRoot(),
      AppRouting,
      StoreModule.provideStore(appStateReducers)
  ],
    providers: [
        AppConfigurationService,
        ConfigurationsService,
        AlarmService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
