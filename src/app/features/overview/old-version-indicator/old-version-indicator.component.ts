import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import * as Tether from 'tether';

@Component({
    selector: 'old-version-indicator',
    templateUrl: './old-version-indicator.component.html',
    styleUrls: ['./old-version-indicator.component.css']
})
export class OldVersionIndicatorComponent implements OnInit {

    tether;
    tooltipVisible = false;
    @Input() runningVersion: number;
    @Input() newestVersion: number;
    @ViewChild('anchor') anchor;
    @ViewChild('tooltip') tooltip;

    constructor() { }

    ngOnInit() {
    }

    protected tetherConfig;

    ngAfterViewInit() {
        this.tetherConfig = {
            element: this.tooltip.nativeElement,
            target: this.anchor.nativeElement,
            attachment: 'bottom left',
            targetAttachment: 'top right',
        };
        this.tether = new Tether(this.tetherConfig);
        this.tether.disable();
    }

    showTooltip() {
        this.tooltipVisible = true;
        this.tether.enable();
        setTimeout(this.tether.position);
    }

    hideTooltip() {
        this.tether.disable();
        this.tooltipVisible = false;
    }
}
