import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OverviewComponent } from './overview/overview.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/overview', pathMatch: 'full'},
    { path: 'overview', component: OverviewComponent},
    { path: 'editor', loadChildren: 'app/editor/editor.module#EditorModule'}
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
