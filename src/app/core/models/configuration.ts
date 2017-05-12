export interface Configuration {
    path: string;
    state: string;
}

export class ConfigurationStates {
    static ON = 'ON';
    static OFF = 'OFF';
    static FM_OFF = 'FM_OFF';
    static ERROR = 'ERROR';
    static TURNING_ON = 'TURNING_ON';
    static TURNING_OFF = 'TURNING_OFF';
    static RESETTING = 'RESETTING';
}
