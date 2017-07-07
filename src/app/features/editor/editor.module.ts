import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from 'clarity-angular';
import { StoreModule } from '@ngrx/store';

import { EditorRouting } from './editor.routing';

import { EditorComponent } from './editor.component';
import { ExpertEditorComponent } from './expert-editor/expert-editor.component';
import { HistoryComponent } from './history/history.component';

// import * as editorReducer from './state/editor.reducer';

@NgModule({
    imports: [
        CommonModule,
        EditorRouting,
        ClarityModule,
        // StoreModule.forFeature('editorModule', {
        //     editor: editorReducer.reducer
        // })
    ],
    declarations: [
        EditorComponent,
        ExpertEditorComponent,
        HistoryComponent
    ]
})
export class EditorModule { }
