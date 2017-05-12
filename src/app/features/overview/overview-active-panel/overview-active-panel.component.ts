import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Configuration, ConfigurationStates } from '@app/core/models/configuration';
import { customConfigSortFn } from '@app/shared/utils/custom-sort';

@Component({
    selector: 'overview-active-panel',
    templateUrl: './overview-active-panel.component.html',
    styleUrls: ['./overview-active-panel.component.css'],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewActivePanelComponent implements OnInit {

    private _filter: string;
    set filter(newFilter: string) {
        this._filter = newFilter;
        this.refilter();
    }
    get filter(): string {
        return this._filter;
    }

    filteredActive: Array<Configuration>;
    active: Array<Configuration>;

    private _configurations: Array<Configuration>;
    @Input() set configurations(newConfigs: Array<Configuration>) {
        console.log('new configs come to active panel');
        this._configurations = newConfigs;
        this.active = this._configurations.filter(el => {
            return (el.state === ConfigurationStates.ON ||
                    el.state === ConfigurationStates.ERROR);
        });
        this.active.sort(customConfigSortFn);
        this.refilter();
    }

    constructor() { }

    ngOnInit() {
        this.filter = '/global/';
    }

    refilter() {
        try {
            let regexp = new RegExp(this.filter, 'i');
            this.filteredActive = this.active.filter(value => {
                return value.path.search(regexp) >= 0;
            });
        } catch (err) {
            this.filteredActive = [];
        }
    }

}
