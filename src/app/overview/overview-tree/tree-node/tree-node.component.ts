import { Component, OnInit, Input, trigger, state, animate, transition, style, keyframes } from '@angular/core';

@Component({
    selector: 'overview-tree-node',
    templateUrl: './tree-node.component.html',
    styleUrls: ['./tree-node.component.css'],
    animations: [
        trigger('expandTrigger', [
            state('expanded', style({height: '*'})),
            state('collapsed', style({height: '0px', transform: 'translateY(-50%)'})),
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
export class TreeNodeComponent implements OnInit {

    @Input() node;
    expandedState: string;


    constructor() { }

    ngOnInit() {
        this._setExpandedState();
    }

    toggleExpanded() {
        this.node['expanded'] = !this.node['expanded'];
        this._setExpandedState();
    }

    private _setExpandedState() {
        this.expandedState = (this.node['expanded'] ? 'expanded' : 'collapsed');
    }

}
