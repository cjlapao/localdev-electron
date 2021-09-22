import {
  DevelopmentToolStatus,
  DevelopmentToolVersion,
} from './../interfaces/development-tool';
import { MINIKUBE_GETSTATUS_CMD } from './../constants/minikube';
import {
  MinikubeClusterStatus,
  MinikubeStatus,
  MinikubeVersion,
} from './../interfaces/minikube';
import { SpawnCommandRequest } from './../interfaces/SpawnCommandRequest';
import { ipcMain, IpcMainEvent } from 'electron';
import * as axios from 'axios';
import { AxiosResponse } from 'axios';
import {
  MINIKUBE_CHANNEL_NAME,
  MINIKUBE_CHANNEL_RETURN_NAME,
  MINIKUBE_GETLATESTVERSION_CMD,
  MINIKUBE_GETLOCALVERSION_CMD,
} from '../constants/minikube';
import { SpawnCommand } from './SpawCommand';
import { Logger } from './logger';

export class MinikubeService {
  constructor() {
    this.init();
  }

  init(): void {
    ipcMain.handle(MINIKUBE_CHANNEL_NAME, async (event, args) => {
      switch (args) {
        case MINIKUBE_GETLATESTVERSION_CMD:
          try {
            const response = await this.getLatestVersion();
            if (response.data) {
              const version = new DevelopmentToolVersion(response.data);
              return version;
            }
          } catch (err) {
            console.log(err);
            return new DevelopmentToolVersion('0.0.0');
          }
        case MINIKUBE_GETLOCALVERSION_CMD:
          try {
            const response = await this.getInstalledVersion();
            const version = new DevelopmentToolVersion(
              response.minikubeVersion
            );
            return version;
          } catch (err) {
            console.log(err);
            return new DevelopmentToolVersion('0.0.0');
          }
        case MINIKUBE_GETSTATUS_CMD:
          try {
            const response: MinikubeClusterStatus = await this.getStatus();
            if (
              response.Host === 'Running' &&
              response.Kubelet === 'Running' &&
              response.APIServer === 'Running'
            ) {
              return DevelopmentToolStatus.Running;
            } else if (
              response.Host !== 'Running' ||
              response.Kubelet !== 'Running' ||
              response.APIServer !== 'Running'
            ) {
              return DevelopmentToolStatus.Running;
            } else {
              return DevelopmentToolStatus.Error;
            }
            return response;
          } catch (err) {
            console.log(err);
            return DevelopmentToolStatus.Unknown;
          }
        default:
          return;
      }
    });
  }

  install(version: string): boolean {
    return false;
  }

  getStatus(): Promise<MinikubeClusterStatus> {
    return new Promise(async (p) => {
      const request: SpawnCommandRequest = {
        name: 'Minikube',
        cmd: 'minikube',
        args: ['status', '-o', 'json'],
      };

      let status: MinikubeClusterStatus = {
        status: MinikubeStatus.Unknown,
        APIServer: 'Unknown',
        Host: 'Unknown',
        Kubeconfig: 'Unknown',
        Kubelet: 'Unknown',
        Name: 'Unknown',
        Worker: false,
      };

      const statusCmd = await SpawnCommand.exec(request);
      if (statusCmd.error.length > 0 || statusCmd.output.length === 0) {
        p(status);
      }

      try {
        status = JSON.parse(statusCmd.output[0]);
        p(status);
      } catch (error) {
        Logger.debug(`There was an error `);
        p(status);
      }
    });
  }

  getInstalledVersion(): Promise<MinikubeVersion> {
    return new Promise(async (p) => {
      const request: SpawnCommandRequest = {
        name: 'Minikube',
        cmd: 'minikube',
        args: ['version', '-o', 'json'],
      };

      let version: MinikubeVersion = {
        minikubeVersion: '0',
      };

      const localVersionResponse = await SpawnCommand.exec(request);
      if (
        localVersionResponse.error.length > 0 ||
        localVersionResponse.output.length === 0
      ) {
        p(version);
      }

      try {
        version = JSON.parse(localVersionResponse.output[0]);
        p(version);
      } catch (error) {
        Logger.debug(`There was an error `);
        p(version);
      }
    });
  }

  getLatestVersion(): Promise<AxiosResponse<string>> {
    console.log('startingRequest');
    const url =
      'https://storage.googleapis.com/kubernetes-release/release/stable.txt';
    return axios.default.get<string>(url);
  }
}
