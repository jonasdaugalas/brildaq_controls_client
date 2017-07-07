import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from 'clarity-angular';
import { StoreModule } from '@ngrx/store';

import { EditorRouting } from './editor.routing';

import { EditorComponent } from './editor.component';
import { ExpertEditorComponent } from './expert-editor/expert-editor.component';
import { HistoryComponent } from './history/history.component';

import * as editorReducer from './state/editor.reducer';
import { EasyEditorComponent } from './easy-editor/easy-editor.component';

@NgModule({
    imports: [
        CommonModule,
        EditorRouting,
        ClarityModule,
        StoreModule.forFeature('editorModule', editorReducer.reducer)
    ],
    declarations: [
        EditorComponent,
        ExpertEditorComponent,
        HistoryComponent,
        EasyEditorComponent
    ]
})
export class EditorModule { }
