import { Injectable } from '@angular/core';
import { Alarm } from '@app/shared/models/alarm';
import { AppState, AlarmActions } from '@app/shared/models/app-state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppConfigurationService } from '@app/shared/services/app-configuration.service';

@Injectable()
export class AlarmService {

    alarm: Observable<Alarm>;
    protected audio: HTMLAudioElement;

    constructor(
        private store: Store<AppState>,
        private config: AppConfigurationService
    ) {
        this.alarm = this.store.select(state => state.alarm);
        this.audio = new Audio(this.config.alarmAudioFile);
        this.audio.addEventListener('ended', this.onended.bind(this));
        // this.audio.onended = ... <-- is not in angular zone
    }

    play() {
        this.alarm.take(1).subscribe(state => {
            if (!state.isPlaying) {
                this.audio.play();
                // setTimeout(this.onended.bind(this), 1400);
                this.store.dispatch({type: AlarmActions.STARTED});
            }
        });
    }

    onended(error) {
        this.store.dispatch({type: AlarmActions.ENDED});
    }

    toggleMute() {
        this.alarm.take(1).subscribe(state => {
            this.audio.muted = !state.muted;
            this.store.dispatch({type: AlarmActions.TOGGLE_MUTE});
        });
    }

    mute() {
        this.audio.muted = true;
        this.store.dispatch({type: AlarmActions.MUTE});
    }

    unmute() {
        this.audio.muted = false;
        this.store.dispatch({type: AlarmActions.UNMUTE});
    }
}
