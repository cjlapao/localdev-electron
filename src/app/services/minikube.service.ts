import {
  DevelopmentTool,
  DevelopmentToolStatus,
  DevelopmentToolVersion,
} from './../../../app/src/interfaces/development-tool';
import {
  MINIKUBE_CHANNEL_NAME,
  MINIKUBE_GETLATESTVERSION_CMD,
  MINIKUBE_GETLOCALVERSION_CMD,
  MINIKUBE_GETSTATUS_CMD,
} from './../../../app/src/constants/minikube';
import { Injectable } from '@angular/core';
import { BaseDevelopmentToolService } from './base-development-tool.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MinikubeService extends BaseDevelopmentToolService {
  constructor(private client: HttpClient) {
    super(client);

    this.tool = new DevelopmentTool('Minikube');
  }

  async init(): Promise<DevelopmentTool> {
    const latestVersion: DevelopmentToolVersion = await this.ipc.invoke(
      MINIKUBE_CHANNEL_NAME,
      MINIKUBE_GETLATESTVERSION_CMD
    );
    const localVersion: DevelopmentToolVersion = await this.ipc.invoke(
      MINIKUBE_CHANNEL_NAME,
      MINIKUBE_GETLOCALVERSION_CMD
    );

    if (localVersion.version) {
      this.tool.localVersion = localVersion;
      if (localVersion.version !== '0.0.0') {
        this.tool.status = DevelopmentToolStatus.Installed;
      }
    }

    if (latestVersion.version) {
      this.tool.onlineVersion = latestVersion;
    }

    await this.status();
    this.tool.initiated = true;
    return this.tool;
  }

  async status(): Promise<DevelopmentToolStatus> {
    const status: DevelopmentToolStatus = await this.ipc.invoke(
      MINIKUBE_CHANNEL_NAME,
      MINIKUBE_GETSTATUS_CMD
    );

    console.log(status);
    this.tool.status = status;

    return status;
  }
}
