import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';
import { HttpClient } from '@angular/common/http';
import {
  DevelopmentTool,
  DevelopmentToolStatus,
} from '../../../app/src/interfaces/development-tool';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseDevelopmentToolService {
  public ipc: IpcRenderer | undefined;
  public tool: DevelopmentTool;
  public isInitiated: boolean;

  constructor(public httpClient: HttpClient) {
    this.isInitiated = false;
    if (window.require) {
      try {
        this.ipc = window.require('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn("Electron's IPC was not loaded");
    }
  }

  abstract status(): Promise<DevelopmentToolStatus>;

  abstract init(): Promise<DevelopmentTool>;

  getCmdLines(inline: string): string[] {
    const response: string[] = [];

    let lines: string[] = inline.split('\n');
    lines.forEach((line) => {
      if (line) {
        response.push(line);
      }
    });

    return response;
  }
}
