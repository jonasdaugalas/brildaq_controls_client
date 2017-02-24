import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditorComponent } from './editor.component';

const editorRoutes: Routes = [
    { path: '', component: EditorComponent}
];

export const EditorRouting: ModuleWithProviders = RouterModule.forChild(editorRoutes);
