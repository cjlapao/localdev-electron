import {
  SETTINGS_CHANNEL,
  SETTINGS_UPSERT_CMD,
  SETTINGS_GET_CMD,
} from './../../../app/src/constants/settings';
import { Settings } from './../../../app/src/interfaces/settings';
import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public ipc: IpcRenderer | undefined;

  public settings: Settings;

  constructor() {
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

  async get(): Promise<Settings> {
    this.settings = await this.ipc.invoke(SETTINGS_CHANNEL, SETTINGS_GET_CMD);

    return this.settings;
  }

  async upsert(settings: Settings): Promise<boolean> {
    return (await this.ipc.invoke(SETTINGS_UPSERT_CMD, settings)) as boolean;
  }
}
