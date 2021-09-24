import { SETTINGS_UPSERT_CMD } from './../constants/settings';
import { ipcMain } from 'electron';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import {
  SETTINGS_CHANNEL as SETTINGS_CHANNEL,
  SETTINGS_GET_CMD,
} from '../constants/settings';
import { Settings } from '../interfaces/settings';
import { SystemService } from './system';

export class SettingsService {
  private settingsPath: string;

  private defaultSettings: Settings = {
    system: {
      keepLastBackups: 5,
      retry: 5,
    },
    cluster: {
      cpusNumber: '4',
      memorySize: '8192',
      diskSize: '50g',
      ethernetName: 'Ethernet',
      createExternalSwitch: true,
      defaultNamespace: 'default',
      startTunnelAutomatically: true,
      vSwitchName: 'ExternalSwitch',
    },
    globalValues: [],
    namespaces: [],
    defaultAddons: [],
    defaultExtras: [],
    azure: [],
    docker: {
      registries: [],
    },
    neurons: {
      services: [],
    },
    localComponents: [],
    monitoring: {
      deployPrometheus: false,
      name: '',
    },
    istio: {
      enableJaeger: false,
      enableKiali: false,
      namespace: 'istio-system',
    },
  };

  constructor() {
    this.init();
  }

  public getSettingsPath(): string {
    const root = SystemService.getSystemFolder();
    return `${root}/settings.json`;
  }

  init(): void {
    ipcMain.handle(SETTINGS_CHANNEL, async (event, args) => {
      switch (args) {
        case SETTINGS_GET_CMD:
          try {
            const response = await this.getSettings();
            if (response) {
              return response;
            }
          } catch (err) {
            console.log(err);
            return null;
          }
        default:
          return;
      }
    });
    ipcMain.handle(SETTINGS_UPSERT_CMD, async (event, args) => {
      try {
        const response = await this.upsertSettings(args);
        return response;
      } catch (err) {
        console.log(err);
        return false;
      }
    });
  }

  getSettings(): Settings {
    let settings: Settings;

    if (!existsSync(this.getSettingsPath())) {
      console.log('file not found returning default');
      return this.defaultSettings;
    }

    try {
      let settingsCnt = readFileSync(this.getSettingsPath()).toString();
      settings = JSON.parse(settingsCnt);

      return settings;
    } catch {
      return this.defaultSettings;
    }
  }

  upsertSettings(settings: Settings): boolean {
    if (settings && settings.cluster) {
      try {
        const content = JSON.stringify(settings, null, 2);
        writeFileSync(this.getSettingsPath(), content);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }

    return false;
  }
}
