export interface RunningDetails {
    version: number;
    resGID: number;
    URI: string;
}

export class STATES {
    static ON = 'ON';
    static OFF = 'OFF';
    static NO_FM = 'NO_FM';
    static UNKNOWN = 'UNKNOWN';
    static ERROR = 'Error';
    static TURNING_ON = 'TURNING_ON';
    static TURNING_OFF = 'TURNING_OFF';
    static RESETTING = 'RESETTING';
}
