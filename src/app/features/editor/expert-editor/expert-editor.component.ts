import { Component, OnInit, AfterViewInit, Input } from '@angular/core';

import * as ace from 'brace';
import 'brace/mode/xml';
import 'brace/keybinding/vim';
import 'brace/ext/keybinding_menu';
import 'brace/ext/searchbox';

@Component({
  selector: 'expert-editor',
  templateUrl: './expert-editor.component.html',
  styleUrls: ['./expert-editor.component.sass']
})
export class ExpertEditorComponent implements OnInit {

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
        console.log('in initializeEditor');
        if (this.editor) {
            return;
        }
        this.editor = ace.edit('editor');
        this.editor.getSession().setMode('ace/mode/xml');
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

}
