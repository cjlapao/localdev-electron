import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LogEntry, LogType } from '../entities/logger';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private logLines: LogEntry[];
  public displayTimestamp: false;

  public log: Subject<LogEntry>;
  public className: string;

  constructor() {
    this.log = new Subject<LogEntry>();
    this.logLines = [];
  }

  private prune() {
    if (this.logLines.length > 1000) {
      this.logLines.splice(0, 1);
    }
  }

  private addLog(type: LogType, message: any) {
    const logEntry: LogEntry = {
      timestamp: new Date(),
      class:
        this.className && this.className !== 'undefined'
          ? this.className
          : null,
      type: type,
    };

    const messageType = typeof message;
    switch (messageType) {
      case 'string':
        logEntry.message = message;
        break;
      case 'object':
        logEntry.message = JSON.stringify(message, null, 2);
        break;
      case 'boolean':
        logEntry.message = (message as boolean) ? 'true' : 'false';
        break;
      case 'number':
        logEntry.message = (message as number).toString();
        break;
      default:
        logEntry.message = 'undefined';
        break;
    }

    this.prune();
    this.logLines.push(logEntry);
    console.log(
      `${logEntry.timestamp ? logEntry.timestamp.toISOString() : ''} ${
        logEntry.type
      } ${logEntry.class ? logEntry.class : 'localdev'} ${logEntry.message}`
    );
    this.log.next(logEntry);
  }

  info(message: any) {
    this.addLog(LogType.Info, message);
  }
}
