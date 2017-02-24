import { Component, OnInit, AfterViewInit, Input, trigger, state, animate, transition, style, keyframes, ViewChild } from '@angular/core';
import * as Tether from 'tether';

@Component({
    selector: 'overview-tree-node',
    templateUrl: './tree-node.component.html',
    styleUrls: ['./tree-node.component.css'],
    host: {
        '(document:click)': 'toggleDropdown($event)',
    },
    animations: [
        trigger('expandTrigger', [
            state('expanded', style({height: '*'})),
            state('collapsed', style({height: '0px', transform: 'translateY(-50%)', overflow: 'hidden'})),
            transition('expanded => collapsed', animate('100ms ease-out')),
            transition('collapsed => expanded', animate(100, keyframes([
                style({height: 0, transform: 'translateY(-50%)', offset: 0}),
                style({height: '*', transform: 'translateY(2px)', offset: 0.6}),
                style({height: '*', transform: 'translateY(3px)', offset: 0.7}),
                style({height: '*', transform: 'translateY(0)', offset: 1})
            ])))
        ])
    ]
})
export class TreeNodeComponent implements OnInit, AfterViewInit {

    @Input() node;
    tether: Tether;
    @ViewChild('dropdown') dropdown;
    @ViewChild('dropdownMenu') dropdownMenu;
    expandedState: string;
    dropdownIsOpen = false;


    constructor() { }

    ngOnInit() {
        this._setExpandedState();
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

    toggleExpanded() {
        this.node['expanded'] = !this.node['expanded'];
        this._setExpandedState();
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

    private _setExpandedState() {
        this.expandedState = (this.node['expanded'] ? 'expanded' : 'collapsed');
    }

}
