import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from 'clarity-angular';

import { EditorRouting } from './editor.routing';

import { EditorComponent } from './editor.component';
import { ExpertEditorComponent } from './expert-editor/expert-editor.component';
import { HistoryComponent } from './history/history.component';

@NgModule({
    imports: [
        CommonModule,
        EditorRouting,
        ClarityModule
    ],
    declarations: [
        EditorComponent,
        ExpertEditorComponent,
        HistoryComponent
    ]
})
export class EditorModule { }
