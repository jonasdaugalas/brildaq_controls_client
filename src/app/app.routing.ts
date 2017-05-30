import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OverviewComponent } from '@app/features/overview/overview.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/overview', pathMatch: 'full'},
    // { path: 'overview', component: OverviewComponent },
    { path: 'overview', loadChildren: 'app/features/overview/overview.module#OverviewModule'},
    { path: 'editor', loadChildren: 'app/features/editor/editor.module#EditorModule'}
];

// const appRoutes: Routes = [
//     { path: '', redirectTo: '/overview', pathMatch: 'full'},
    // { path: 'overview', loadChildren: 'app/features/overview/overview.module#OverviewModule'},
//     // { path: 'editor', loadChildren: 'app/features/editor/editor.module#EditorModule'}
// ];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
