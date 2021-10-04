export enum LogType {
  Info = 'Info',
  Error = 'Error',
  Warning = 'Warn',
  Debug = 'Debug',
  Trace = 'Trace',
}

export interface LogEntry {
  type: LogType;
  class?: string;
  timestamp: Date;
  message?: string;
  object?: string;
}
