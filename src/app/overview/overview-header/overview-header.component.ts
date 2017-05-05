import {
    Component, EventEmitter, OnInit, Input, Output, ChangeDetectionStrategy
} from '@angular/core';
import { AlarmService } from '@app/shared/services/alarm.service';
import { ConfigurationsService } from '@app/shared/services/configurations.service';
import { Alarm } from '@app/shared/models/alarm';

@Component({
    selector: 'overview-header',
    templateUrl: './overview-header.component.html',
    styleUrls: ['./overview-header.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewHeaderComponent implements OnInit {

    @Input() owners: Array<string>;
    @Input() owner;
    @Output() ownerChange = new EventEmitter();
    // @Output() refresh = new EventEmitter();
    @Input() alarm: Alarm;

    constructor(protected alarmService: AlarmService,
                protected configs: ConfigurationsService) {
    }

    ngOnInit() {}

    toggleAlarmMute() {
        this.alarmService.toggleMute();
    }

    playAlarm() {
        this.alarmService.play();
    }

    selectOwner(owner) {
        this.ownerChange.emit(owner);
    }

    onRefreshClick(event) {
        this.configs.updateConfigs();
    }
}
