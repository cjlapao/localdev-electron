import { ipcMain, IpcMainEvent } from 'electron';
import * as axios from 'axios';
import { AxiosResponse } from 'axios';
import {
  MINIKUBE_CHANNEL_NAME,
  MINIKUBE_CHANNEL_RETURN_NAME,
  MINIKUBE_GETLATESTVERSION_CMD,
} from '../constants/minikube';

export class MinikubeService {
  constructor() {
    ipcMain.handle(MINIKUBE_CHANNEL_NAME, async (event, args) => {
      switch (args) {
        case MINIKUBE_GETLATESTVERSION_CMD:
          try {
            const response = await this.getLatestVersion();
            let result = response.data.replace('v', '').replace('.', '');
            return result;
          } catch (err) {
            console.log(err);
            return;
          }
        default:
          return;
      }
    });
  }

  install(version: string): boolean {
    return false;
  }

  getLatestVersion(): Promise<AxiosResponse<string>> {
    console.log('startingRequest');
    const url =
      'https://storage.googleapis.com/kubernetes-release/release/stable.txt';
    return axios.default.get<string>(url);
  }
}
