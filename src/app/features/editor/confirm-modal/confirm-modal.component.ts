import {
    Component, OnInit, AfterViewInit, Input, Output, EventEmitter
} from '@angular/core';

@Component({
    selector: 'confirm-modal',
    templateUrl: './confirm-modal.component.html',
    styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit, AfterViewInit {

    @Output() close = new EventEmitter();
    @Input() state;

    constructor() { }

    ngOnInit() {
    }

    ngAfterViewInit() {

    }

    open() {
        // this.modal.open();
    }

    callback() {
        // this.modal.close();
        console.log('callback');
    }

    onClickClose() {
        console.log('clicked close');
        this.close.emit();
    }

}
