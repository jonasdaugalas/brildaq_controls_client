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

    ngAfterViewInit() {
    }

    showTooltip() {
        if (!this.tooltip) {
            return;
        }
        this.tether = new Tether({
            element: this.tooltip.nativeElement,
            target: this.anchor.nativeElement,
            attachment: 'bottom left',
            targetAttachment: 'top right',
        });
        this.tooltipVisible = true;
        setTimeout(this.tether.position);
    }

    hideTooltip() {
        this.tooltipVisible = false;
        if (this.tether) {
            this.tether.destroy();
        }
    }
}
