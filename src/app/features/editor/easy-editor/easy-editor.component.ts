import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'easy-editor',
    templateUrl: './easy-editor.component.html',
    styleUrls: ['./easy-editor.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EasyEditorComponent implements OnInit {

    @Input() configDetails;

    constructor() { }

    ngOnInit() {
    }

}
