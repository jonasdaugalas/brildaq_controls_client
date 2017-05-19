import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Configuration } from '@app/core/models/configuration';
import { STATES } from '@app/core/models/running-details';
import { customConfigSortFn } from '@app/shared/utils/custom-sort';

class Leaf {
    name: string;
    isLeaf = true;
    icon = 'document';
    iconClass = 'is-solid';

    constructor(public path: string) {
        this.name = path.split('/').pop();
    }
}

@Component({
    selector: 'overview-tree',
    templateUrl: './overview-tree.component.html',
    styleUrls: ['./overview-tree.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewTreeComponent implements OnInit {

    _runningDetails: {string: any};
    @Input() set running(newRunning) {
        this._runningDetails = newRunning;
        this.updateLeafs(Object.keys(newRunning));
    }

    _runningStates: {string: string};
    @Input() set states(newStates) {
        this._runningStates = newStates;
        this.updateLeafs(Object.keys(newStates));
    }

    _paths: Array<string>;
    @Input() set paths(newPaths: Array<string>) {
        this._paths = newPaths.sort(customConfigSortFn);
        this.buildTree();
    }

    configTree = [];
    configTreeLeafs = {};

    constructor() { }

    ngOnInit() {
    }

    protected buildTree() {
        console.log('building tree', this._paths);
        this.configTree = [];
        this.updateLeafs(this._paths);
        this._paths.forEach(path => {
            const branch = path.split('/');
            branch.shift(); // drop first element because path starts with '/'
            branch.shift(); // drop second element because it is user
            this.makeTreeBranch(this.configTree, branch, path);
        });
    }

    protected makeTreeBranch(fromNode, branch, fullpath) {
        let name = branch.shift();
        if (branch.length === 0) {
            // name is last element of branch
            const leaf = this.configTreeLeafs[fullpath];
            return fromNode.push(leaf);
        }
        let node = fromNode.find((el) => el.name === name);
        if (typeof node === 'undefined') {
            // node does not exists, create new
            node = {
                name: name,
                expanded: true,
                nodes: []
            };
            fromNode.push(node);
        }
        // continues building branch on child nodes
        return this.makeTreeBranch(node.nodes, branch, fullpath);
    }

    protected updateLeafs(paths) {
        paths.forEach(path => {
            let leaf = this.configTreeLeafs[path];
            if (!leaf) {
                leaf = new Leaf(path);
                this.configTreeLeafs[path] = leaf;
            }
            this.updateLeafStatus(leaf);
        });
    }

    protected updateLeafStatus(leaf) {
        if (!this._runningDetails.hasOwnProperty(leaf.path)) {
            leaf.status = STATES.NO_FM;
            leaf.icon = 'document';
            leaf.iconClass = 'is-solid';
            return;
        }
        leaf.status = this._runningStates[leaf.path];
        switch (this._runningStates[leaf.path]) {
        case STATES.ON:
            leaf.icon = 'heart';
            leaf.iconClass = 'is-solid is-success';
            break;
        case STATES.OFF:
            leaf.icon = 'cog';
            leaf.iconClass = 'is-solid is-info';
            break;
        case STATES.ERROR:
            leaf.icon = 'error';
            leaf.iconClass = 'is-solid is-error';
            break;
        case STATES.RESETTING:
        case STATES.TURNING_ON:
        case STATES.TURNING_OFF:
            leaf.icon = null;
            leaf.iconClass = 'spinner spinner-inline spinner-sm';
            break;
        default:
            leaf.status = STATES.UNKNOWN;
            leaf.icon = 'warning';
            leaf.iconClass = 'is-solid is-warning';
        }

    }

}
