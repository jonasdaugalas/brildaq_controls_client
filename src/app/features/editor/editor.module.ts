import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClarityModule } from 'clarity-angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects'

import { EditorRouting } from './editor.routing';

import * as editorReducer from './state/editor.reducer';
import { EditorEffects } from './state/editor.effects';
import { EditorComponent } from './editor.component';
import { ExpertEditorComponent } from './expert-editor/expert-editor.component';
import { HistoryComponent } from './history/history.component';
import { EasyEditorComponent } from './easy-editor/easy-editor.component';
import { ExecutiveFormComponent } from './executive-form/executive-form.component';
import { FieldsEditorComponent } from './easy-editor/fields-editor/fields-editor.component';
import { FieldComponent } from './easy-editor/fields-editor/field/field.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { PreviewModalComponent } from './preview-modal/preview-modal.component';
import { ResponseModalComponent } from './response-modal/response-modal.component';

@NgModule({
    imports: [
        CommonModule,
        EditorRouting,
        FormsModule,
        ClarityModule,
        StoreModule.forFeature('editorModule', editorReducer.reducer),
        EffectsModule.forFeature([
            EditorEffects
        ])
    ],
    declarations: [
        EditorComponent,
        ExpertEditorComponent,
        HistoryComponent,
        EasyEditorComponent,
        ExecutiveFormComponent,
        FieldsEditorComponent,
        FieldComponent,
        ConfirmModalComponent,
        PreviewModalComponent,
        ResponseModalComponent
    ]
})
export class EditorModule { }
