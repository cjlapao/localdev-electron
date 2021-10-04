export enum LogType {
  Info = 'Info',
  Error = 'Error',
  Warning = 'Warning',
}

export interface LogEntry {
  type: LogType;
  class?: string;
  timestamp: Date;
  message?: string;
}
