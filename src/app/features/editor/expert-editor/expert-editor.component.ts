import {
    Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, ViewChild
} from '@angular/core';
import { html as html_beautify } from 'js-beautify';

import * as ace from 'brace';
import 'brace/mode/xml';
import 'brace/keybinding/vim';
import 'brace/ext/keybinding_menu';
import 'brace/ext/searchbox';

const VirtualRenderer = ace.acequire('ace/virtual_renderer').VirtualRenderer;
const Editor = ace.acequire('ace/editor').Editor;
const EditSession = ace.acequire('ace/edit_session').EditSession;

@Component({
    selector: 'expert-editor',
    templateUrl: './expert-editor.component.html',
    styleUrls: ['./expert-editor.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpertEditorComponent implements OnInit {

    @ViewChild('editorContainer') editorContainer;
    @ViewChild('executiveForm') executiveForm;

    @Output('previewFinalXML') outputPreviewFinal = new EventEmitter<{xml: string, executive: any}>();

    protected _configDetails: any;
    @Input() set configDetails(newDetails) {
        this._configDetails = newDetails;
        console.log('Setting config details in expert editor', newDetails);
        this.updateConfigDetails();
    }
    get configDetails() {
        return this._configDetails;
    }

    vimKeybindings: boolean = false;
    editor: ace.Editor;

    constructor() { }

    ngOnInit() {
        this.initializeEditor();
    }

    initializeEditor() {
        if (this.editor || !this.editorContainer) {
            return;
        }
        const renderer = new VirtualRenderer(this.editorContainer.nativeElement);
        const session = new EditSession('', 'ace/mode/xml');
        this.editor = new Editor(renderer, session);
        this.editor.$blockScrolling = Infinity;
    }

    updateConfigDetails() {
        if (!this._configDetails || !this._configDetails.xml) {
            return;
        }
        this.initializeEditor();
        this.editor.setValue(this._configDetails.xml);
    }

    toggleBindings(newVal) {
        this.vimKeybindings = !this.vimKeybindings;
        if (this.vimKeybindings) {
            this.editor.setKeyboardHandler('ace/keyboard/vim');
        } else {
            this.editor.setKeyboardHandler(null);
        }
    };

    beautifyXML() {
        const beautified = html_beautify(
            this.editor.getValue(), {indent_size: 2});
        this.editor.setValue(beautified);
    }

    submit() {
    }

    previewFinalXML() {
        this.outputPreviewFinal.emit({
            xml: this.editor.getValue(),
            executive: this.executiveForm.getValue()
        });
    }

}
