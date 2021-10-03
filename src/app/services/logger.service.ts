import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { EventEmitter } from 'stream';

export enum LogType {
  Info = 'Info',
  Error = 'Error',
  Warning = 'Warning',
}
@Injectable({
  providedIn: 'root',
})
export class LoggerService<T> {
  private className: string;
  private logLines: string[];
  public displayTimestamp: false;

  public log: Subject<string>;

  constructor() {
    this.log = new Subject<string>();
    this.logLines = [];
  }

  private prune() {
    if (this.logLines.length > 1000) {
      this.logLines.splice(0, 1);
    }
  }

  private addLog(type: LogType, message: any) {
    let messageValue: string;
    let line: string = '';
    switch (typeof message) {
      case 'string':
        messageValue = message;
      case 'object':
        messageValue = JSON.stringify(message, null, 2);
      case 'boolean':
        messageValue = (message as boolean) ? 'true' : 'false';
      case 'number':
        messageValue = (message as number).toString();
      default:
        messageValue = 'undefined';
    }

    if (this.displayTimestamp) {
      line += `${Date.now} `;
    }

    if (this.className) {
      line += `[${this.className}] `;
    }

    line += `${type}: ${messageValue}`;

    this.prune();
    this.logLines.push(line);
    this.log.next(line);
    console.log(line);
  }

  info(message: any) {
    this.addLog(LogType.Info, message);
  }
}
