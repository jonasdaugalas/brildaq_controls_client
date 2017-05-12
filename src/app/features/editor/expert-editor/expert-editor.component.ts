import { Component, OnInit } from '@angular/core';

import * as ace from 'brace';
import 'brace/mode/xml';
import 'brace/keybinding/vim';

@Component({
  selector: 'expert-editor',
  templateUrl: './expert-editor.component.html',
  styleUrls: ['./expert-editor.component.sass']
})
export class ExpertEditorComponent implements OnInit {

    vimKeybindings: boolean = false;
    editor: ace.Editor;
    constructor() { }

    ngOnInit() {
        this.editor = ace.edit('editor');
        this.editor.getSession().setMode('ace/mode/xml');
        this.editor.setValue('crap crap crap');
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
