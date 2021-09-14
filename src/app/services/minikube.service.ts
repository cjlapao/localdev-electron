import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';

@Injectable({
  providedIn: 'root',
})
export class MinikubeService {
  private _ipc: IpcRenderer | undefined;

  constructor() {
    if (window.require) {
      try {
        this._ipc = window.require('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn("Electron's IPC was not loaded");
    }
  }

  async getMinikubeStatus(): Promise<string> {
    return new Promise((v) => {
      this._ipc.sendSync('getMinikubeStatusAsync');
      console.log('test');
      this._ipc.on('getMinikubeStatusAsyncResponse', (event, arg) => {
        console.log('test1');
        v(arg);
      });
    });
  }

  getMinikubeTool() {}
}
