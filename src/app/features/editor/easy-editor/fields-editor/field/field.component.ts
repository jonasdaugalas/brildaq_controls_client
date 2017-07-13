import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'field',
    templateUrl: './field.component.html',
    styleUrls: ['./field.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldComponent implements OnInit {

    protected _field;
    @Input() set field(newField) {
        this._field = newField;
        if (this._field.type === 'bool') {
            if (this._field.value === 'false') {
                this._field.value = false;
            } else {
                this._field.value = Boolean(this._field.value);
            }
        }
    }
    get field() {
        return this._field;
    }

    constructor() { }

    ngOnInit() {
    }

}
