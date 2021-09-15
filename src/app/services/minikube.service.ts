import { MinikubeStatusMessage, MinikubeStatus } from './../entities/minikube';
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

  getMinikubeStatus(): Promise<MinikubeStatus> {
    return new Promise((v) => {
      this._ipc.send('getMinikubeStatus');
      this._ipc.on('getMinikubeStatusResponse', (event, arg) => {
        const response: SpawnCommandResponse = arg
        response.output.forEach( out => {
          let msg: MinikubeStatusMessage;
          msg = JSON.parse(out);
          if (msg.data.message.indexOf("not found.") > -1) {
            v(MinikubeStatus.NotFound)
          }
        })

        v(MinikubeStatus.Unknown);
      });
    });
  }

  getMinikubeTool() {}
}
