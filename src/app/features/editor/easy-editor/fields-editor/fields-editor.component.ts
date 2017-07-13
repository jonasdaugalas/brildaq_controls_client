import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'fields-editor',
    templateUrl: './fields-editor.component.html',
    styleUrls: ['./fields-editor.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldsEditorComponent implements OnInit {

    protected _fields;
    @Input() set fields(newFields: Array<any>) {
        if (!newFields) {
            this._fields = [];
            return;
        }
        this._fields = newFields.map(v => {
            return Object.assign({}, v);
        });
    };
    get fields() {
        return this._fields;
    }

    constructor() { }

    ngOnInit() {
    }

    getModifiedFields() {
        return this._fields;
    }

}
