export interface Command {
    name: string;
    execute: (args: any) => void;

    aliases?: string[];
    desc?: string;
    cooldown?: number;
    scope?: boolean | null
}

export interface Event {
    name: string;
    emitter: 'on' | 'once';
    emit: (...args: any) => void;
}

export type LoggerType = 'info' | 'warn' | 'error'