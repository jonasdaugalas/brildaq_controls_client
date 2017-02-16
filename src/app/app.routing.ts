import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OverviewComponent } from './overview/overview.component';
import { EditorComponent } from './editor/editor.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/overview', pathMatch: 'full'},
    { path: 'overview', component: OverviewComponent},
    { path: 'editor', component: EditorComponent}
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
