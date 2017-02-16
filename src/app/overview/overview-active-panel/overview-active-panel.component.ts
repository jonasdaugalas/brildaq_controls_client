import { Component, OnInit, Input } from '@angular/core';
import { Configuration, ConfigurationStates } from '@app/shared/models/configuration';

@Component({
  selector: 'overview-active-panel',
  templateUrl: './overview-active-panel.component.html',
  styleUrls: ['./overview-active-panel.component.css']
})
export class OverviewActivePanelComponent implements OnInit {

    active: Array<Configuration>;
    private _configurations: Array<Configuration>;
    @Input() set configurations(newConfigs: Array<Configuration>) {
        this._configurations = newConfigs;
        this.active = this._configurations.filter(el => {
            return (el.state === ConfigurationStates.ON ||
                    el.state === ConfigurationStates.ERROR);
        });
    }

    constructor() { }

    ngOnInit() {
    }

}
