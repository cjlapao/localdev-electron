import { Injectable } from '@angular/core';
import { Observable, Subject, filter } from 'rxjs';
import { LogEntry, LogType } from '../entities/logger';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private logLines: LogEntry[];
  private logSubject: Subject<LogEntry>;

  public className: string;

  constructor() {
    this.logSubject = new Subject<LogEntry>();
    this.logLines = [];
  }

  private prune() {
    if (this.logLines.length > 1000) {
      this.logLines.splice(0, 1);
    }
  }

  private addLog(type: LogType, message: any, object?: any) {
    const logEntry: LogEntry = {
      timestamp: new Date(),
      class:
        this.className && this.className !== 'undefined'
          ? this.className
          : null,
      type: type,
    };

    logEntry.message = this.stringify(message);
    if (object) {
      logEntry.object = this.stringify(object);
    }

    this.prune();
    this.logLines.push(logEntry);
    console.log(
      `${logEntry.timestamp ? logEntry.timestamp.toISOString() : ''} ${
        logEntry.type
      } ${logEntry.class ? logEntry.class : 'localdev'} ${logEntry.message}`
    );
    this.logSubject.next(logEntry);
  }

  private stringify(obj: any): string {
    switch (typeof obj) {
      case 'string':
        return obj;
      case 'object':
        return JSON.stringify(obj, null, 2);
      case 'boolean':
        return (obj as boolean) ? 'true' : 'false';
      case 'number':
        return (obj as number).toString();
      default:
        return 'undefined';
    }
  }

  getLogs(className?: string): Observable<LogEntry> {
    if (className) {
      return this.logSubject.pipe(filter((f) => f.class === className));
    } else {
      return this.logSubject;
    }
  }

  info(message: any, obj?: any) {
    this.addLog(LogType.Info, message, obj);
  }

  error(message: any, obj?: any) {
    this.addLog(LogType.Error, message, obj);
  }

  warn(message: any, obj?: any) {
    this.addLog(LogType.Warning, message, obj);
  }

  debug(message: any, obj?: any) {
    this.addLog(LogType.Debug, message, obj);
  }

  trace(message: any, obj?: any) {
    this.addLog(LogType.Trace, message, obj);
  }

  toString(logEntry: LogEntry): string {
    return `${logEntry.timestamp ? logEntry.timestamp.toISOString() : ''} ${
      logEntry.type
    } ${logEntry.class ? logEntry.class : 'local-dev'} ${logEntry.message}`;
  }
}
