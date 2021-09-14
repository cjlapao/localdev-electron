import { SpawnCommandResponse } from './../../../app/src/interfaces/SpawnCommandResponse';
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

  getMinikubeStatus(): Promise<SpawnCommandResponse> {
    return new Promise((v) => {
      console.log('before send');
      this._ipc.send('getMinikubeStatus');
      console.log('test');
      this._ipc.on('getMinikubeStatusResponse', (event, arg) => {
        console.log('test1');
        console.log(arg);
        v(arg);
      });
    });
  }

  getMinikubeTool() {}
}
