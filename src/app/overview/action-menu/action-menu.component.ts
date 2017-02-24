import { Component, OnInit, Input } from '@angular/core';
import { Configuration } from '@app/shared/models/configuration';

@Component({
  selector: 'config-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.sass']
})
export class ActionMenuComponent implements OnInit {

    configName: string;

    private _config;
    @Input() set config(newConfig: Configuration) {
        this._config = newConfig;
        this.configName = newConfig.path.split('/').pop();
    }
    get config(): Configuration {
        return this._config;
    }

    constructor() { }

    ngOnInit() {
    }

}
