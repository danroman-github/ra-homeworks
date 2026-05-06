export interface CityClock {
    id: number;
    name: string;
    timezoneOffset: number;
}

export interface ClockTime {
    hours: number;
    minutes: number;
    seconds: number;
}