import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'preview-modal',
    templateUrl: './preview-modal.component.html',
    styleUrls: ['./preview-modal.component.css']
})
export class PreviewModalComponent implements OnInit {

    @Output() close = new EventEmitter();
    @Input() state;

    constructor() { }

    ngOnInit() {
    }

    onClickClose() {
        console.log('click close');
        this.close.emit();
    }

}
