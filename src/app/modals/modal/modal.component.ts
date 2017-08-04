import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

    @Output() closed = new EventEmitter();

    protected _open: boolean;
    @Input() set open(newVal) {
        this._open = newVal;
        if (!newVal) {
            this.closed.emit();
        }
    }
    get open() {
        return this._open;
    }
    @Input() size: string | undefined;
    @Input() closable: boolean;

    constructor() { }

    ngOnInit() {
    }

}
