import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    { path: '', redirectTo: '/overview', pathMatch: 'full'},
    { path: 'overview', loadChildren: 'app/features/overview/overview.module#OverviewModule'},
    { path: 'editor', loadChildren: 'app/features/routed-editor/routed-editor.module#RoutedEditorModule'},
    { path: 'standalone', loadChildren: 'app/features/standalone/standalone.module#StandaloneModule'}
];

// const appRoutes: Routes = [
//     { path: '', redirectTo: '/overview', pathMatch: 'full'},
    // { path: 'overview', loadChildren: 'app/features/overview/overview.module#OverviewModule'},
//     // { path: 'editor', loadChildren: 'app/features/editor/editor.module#EditorModule'}
// ];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
