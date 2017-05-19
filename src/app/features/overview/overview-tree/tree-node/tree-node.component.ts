import { Component, OnInit, AfterViewInit, Input, ViewChild } from '@angular/core';
import * as Tether from 'tether';

@Component({
    selector: 'overview-tree-node',
    templateUrl: './tree-node.component.html',
    styleUrls: ['./tree-node.component.css'],
    host: {
        '(document:click)': 'toggleDropdown($event)',
    }
})
export class TreeNodeComponent implements OnInit, AfterViewInit {

    @Input() node;
    tether: Tether;
    @ViewChild('dropdown') dropdown;
    @ViewChild('dropdownMenu') dropdownMenu;
    dropdownIsOpen = false;


    constructor() { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        if (this.node['isLeaf']) {
            this.tether = new Tether({
                element: this.dropdownMenu.nativeElement,
                target: this.dropdown.nativeElement,
                attachment: 'middle left',
                targetAttachment: 'top right',
                offset: '0 -6px',
                constraints: [{
                    to: 'scrollParent',
                    pin: ['top', 'bottom']
                }]
            });
        }
    }

    toggleDropdown(event) {
        if (this.node['isLeaf']) {
            if (event['target'] === this.dropdown.nativeElement) {
                console.log(event);
                this.dropdownIsOpen = true;
                this.tether.position();
            } else {
                this.dropdownIsOpen = false;
            }
        }
    }

}
