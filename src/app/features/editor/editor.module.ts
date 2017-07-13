import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClarityModule } from 'clarity-angular';
import { StoreModule } from '@ngrx/store';

import { EditorRouting } from './editor.routing';

import { EditorComponent } from './editor.component';
import { ExpertEditorComponent } from './expert-editor/expert-editor.component';
import { HistoryComponent } from './history/history.component';

import * as editorReducer from './state/editor.reducer';
import { EasyEditorComponent } from './easy-editor/easy-editor.component';
import { ExecutiveFormComponent } from './executive-form/executive-form.component';
import { FieldsEditorComponent } from './easy-editor/fields-editor/fields-editor.component';
import { FieldComponent } from './easy-editor/fields-editor/field/field.component';

@NgModule({
    imports: [
        CommonModule,
        EditorRouting,
        FormsModule,
        ClarityModule,
        StoreModule.forFeature('editorModule', editorReducer.reducer)
    ],
    declarations: [
        EditorComponent,
        ExpertEditorComponent,
        HistoryComponent,
        EasyEditorComponent,
        ExecutiveFormComponent,
        FieldsEditorComponent,
        FieldComponent
    ]
})
export class EditorModule { }
