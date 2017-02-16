import { Component, OnInit, Input } from '@angular/core';
import { Configuration, ConfigurationStates } from '@app/shared/models/configuration';

@Component({
    selector: 'overview-tree',
    templateUrl: './overview-tree.component.html',
    styleUrls: ['./overview-tree.component.css']
})
export class OverviewTreeComponent implements OnInit {

    _configurations;

    @Input() set configurations(newConfigs) {
        this._configurations = newConfigs;
        this.buildTree();
    }

    configTree = [
        {
            name: 'default1',
            expanded: true,
            nodes: [
                {
                    name: 'asdf',
                    isLeaf: true,
                    path: 'default1/asdf',
                    icon: 'cog',
                    iconClass: 'is-solid is-info'
                }, {
                    name: 'qwer',
                    expanded: true,
                    nodes: [
                        {
                            name: 'zxcv',
                            isLeaf: true,
                            path: 'default1/qwer/zxcv',
                            icon: 'heart',
                            iconClass: 'is-solid is-success'
                        }
                    ]
                }
            ]
        }, {
            name: 'default1',
            expanded: false,
            nodes: [
                {
                    name: 'asdf',
                    isLeaf: true,
                    path: 'default2/asdf',
                    icon: 'error',
                    iconClass: 'is-error is-solid'
                }
            ]
        }, {
            name: 'default3',
            expanded: true,
            nodes: [
                {
                    name: 'asdf',
                    isLeaf: true,
                    path: 'default3/asdf',
                    icon: 'document',
                    iconClass: 'is-solid'
                }
            ]
        }
    ];

    protected buildTree() {
        console.log('building tree');
        console.log(this._configurations);
        this.configTree = [];
        for (let config of this._configurations) {
            let branch = config.path.split('/');
            branch.shift(); // drop first element because path starts with '/'
            this.makeTreeBranch(this.configTree, branch, config);
        }
    }

    protected makeTreeBranch(fromNode, branch, config) {
        console.log(fromNode, branch, this.configTree);
        let name = branch.shift();
        if (branch.length === 0) {
            return fromNode.push(this.makeTreeLeaf(config));
        }
        let node = fromNode.find((el) => el.name === name);
        if (typeof node === 'undefined') {
            node = {
                name: name,
                expanded: true,
                nodes: []
            };
            fromNode.push(node);
        }
        return this.makeTreeBranch(node.nodes, branch, config);
    }

    protected makeTreeLeaf(config) {
        let icon = 'document';
        let iconClass = 'is-solid';
        switch (config.state) {
        case ConfigurationStates.ON:
            icon = 'heart';
            iconClass = 'is-solid is-success';
            break;
        case ConfigurationStates.OFF:
            icon = 'cog';
            iconClass = 'is-solid is-info';
            break;
        case ConfigurationStates.FM_OFF:
            icon = 'document';
            iconClass = 'is-solid';
            break;
        case ConfigurationStates.ERROR:
            icon = 'error';
            iconClass = 'is-solid is-error';
            break;
        case ConfigurationStates.RESETTING:
        case ConfigurationStates.TURNING_ON:
        case ConfigurationStates.TURNING_OFF:
            icon = null;
            iconClass = 'spinner spinner-inline spinner-sm';
            break;
        }
        return {
            name: config.path.split('/').pop(),
            isLeaf: true,
            path: config.path,
            icon: icon,
            iconClass: iconClass
        };
    }

    // openFile(directoryName: string, fileName: string) {
    //     ...
    //     ...
    // }
    constructor() { }

    ngOnInit() {
    }

}
