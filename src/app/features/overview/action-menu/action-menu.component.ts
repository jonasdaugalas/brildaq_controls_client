import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'config-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.sass']
})
export class ActionMenuComponent implements OnInit {

    name: string;

    private _path;
    @Input() set path(newPath: string) {
        this._path = newPath;
        this.name = newPath.split('/').pop();
    }
    get path(): string {
        return this._path;
    }

    constructor() { }

    ngOnInit() {
    }

}
