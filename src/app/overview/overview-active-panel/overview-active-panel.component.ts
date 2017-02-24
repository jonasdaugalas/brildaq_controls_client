import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Configuration, ConfigurationStates } from '@app/shared/models/configuration';
import { customConfigSortFn } from '@app/shared/utils/custom-sort';

@Component({
    selector: 'overview-active-panel',
    templateUrl: './overview-active-panel.component.html',
    styleUrls: ['./overview-active-panel.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewActivePanelComponent implements OnInit {

    private _filter: string;
    set filter(newFilter: string) {
        this._filter = newFilter;
        try {
            let regexp = new RegExp(newFilter, 'i');
            this.filteredActive = this.active.filter(value => {
                return value.path.search(regexp) >= 0;
            });
        } catch (err) {
            this.filteredActive = [];
        }
    }
    get filter(): string {
        return this._filter;
    }

    filteredActive: Array<Configuration>;
    active: Array<Configuration>;

    private _configurations: Array<Configuration>;
    @Input() set configurations(newConfigs: Array<Configuration>) {
        this._configurations = newConfigs;
        this.active = this._configurations.filter(el => {
            return (el.state === ConfigurationStates.ON ||
                    el.state === ConfigurationStates.ERROR);
        });
        this.active.sort(customConfigSortFn);
    }

    constructor() { }

    ngOnInit() {
        this.filter = '/global/';
    }

}
