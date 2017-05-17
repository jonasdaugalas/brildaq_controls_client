import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Configuration } from '@app/core/models/configuration';
import { STATES } from '@app/core/models/running-details';
import { customConfigSortFn } from '@app/shared/utils/custom-sort';

@Component({
    selector: 'overview-tree',
    templateUrl: './overview-tree.component.html',
    styleUrls: ['./overview-tree.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewTreeComponent implements OnInit {

    _configurations;

    @Input() set configurations(newConfigs) {
        this._configurations = newConfigs;
        this._configurations.sort(customConfigSortFn);
        this.buildTree();
    }

    configTree = [];

    constructor() { }

    ngOnInit() {
    }

    protected buildTree() {
        console.log('building tree');
        console.log(this._configurations);
        this.configTree = [];
        for (let config of this._configurations) {
            let branch = config.path.split('/');
            branch.shift(); // drop first element because path starts with '/'
            this.makeTreeBranch(this.configTree, branch, config);
        }
        console.log(this.configTree);
    }

    protected makeTreeBranch(fromNode, branch, config) {
        let name = branch.shift();
        console.log(fromNode, branch, config, name);
        if (branch.length === 0) {
            return fromNode.push(this.makeTreeLeaf(config));
        }
        let node = fromNode.find((el) => el.name === name);
        console.log(node);
        if (typeof node === 'undefined') {
            node = {
                name: name,
                expanded: true,
                nodes: []
            };
            fromNode.push(node);
        }
        console.log(node);
        return this.makeTreeBranch(node.nodes, branch, config);
    }

    protected makeTreeLeaf(config) {
        let icon = 'document';
        let iconClass = 'is-solid';
        switch (config.state) {
        case STATES.ON:
            icon = 'heart';
            iconClass = 'is-solid is-success';
            break;
        case STATES.OFF:
            icon = 'cog';
            iconClass = 'is-solid is-info';
            break;
        case STATES.FM_OFF:
            icon = 'document';
            iconClass = 'is-solid';
            break;
        case STATES.ERROR:
            icon = 'error';
            iconClass = 'is-solid is-error';
            break;
        case STATES.RESETTING:
        case STATES.TURNING_ON:
        case STATES.TURNING_OFF:
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

}
