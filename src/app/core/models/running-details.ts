export interface RunningDetails {
    version: number;
    resGID: number;
    URI: string;
    stateLoading: boolean;
    stateLoaded: boolean;
    lastStateLoaded: Date;
    state: string;
}

export class STATES {
    static ON = 'ON';
    static OFF = 'OFF';
    static FM_OFF = 'FM_OFF';
    static ERROR = 'ERROR';
    static TURNING_ON = 'TURNING_ON';
    static TURNING_OFF = 'TURNING_OFF';
    static RESETTING = 'RESETTING';
}
