import {
  MINIKUBE_CHANNEL_RETURN_NAME,
  MINIKUBE_CHANNEL_NAME,
  MINIKUBE_GETLATESTVERSION_CMD,
} from './../../../app/src/constants/minikube';
import { DevelopmentTool, DevelopmentToolStatus } from './../entities/tool';
import { MinikubeStatusMessage, MinikubeStatus } from './../entities/minikube';
import { SpawnCommandResponse } from './../../../app/src/interfaces/SpawnCommandResponse';
import { Injectable } from '@angular/core';
import { BaseDevelopmentToolService } from './base-development-tool.service';
import { SpawnCommandRequest } from '../../../app/src/interfaces/SpawnCommandRequest';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MinikubeService extends BaseDevelopmentToolService {
  constructor(private client: HttpClient) {
    super(client);

    this.tool = {
      name: 'minikube',
    };
  }

  async init(): Promise<DevelopmentTool> {
    return this.tool;
  }

  status(): Promise<DevelopmentToolStatus> {
    return new Promise((r) => {
      if (this.tool.installedVersion) {
        this.tool.status = DevelopmentToolStatus.Installed;
      }

      r(this.tool.status);
    });
  }

  test(): Promise<string> {
    return new Promise((p) => {
      console.log('test1');
      this.ipc
        .invoke(MINIKUBE_CHANNEL_NAME, MINIKUBE_GETLATESTVERSION_CMD)
        .then((res) => {
          console.log('finished');
          p(res);
        });
    });
  }

  getMinikubeStatus(): Promise<MinikubeStatus> {
    return new Promise((v) => {
      const cmd: SpawnCommandRequest = {
        name: 'minikubeVersion',
        cmd: 'minikube',
        args: ['status', '-o', 'json'],
      };

      this.ipc.send('spawCmd', cmd);
      this.ipc.on(`spawCmd_${cmd.name}_Response`, (event, arg) => {
        const response: SpawnCommandResponse = arg;
        if (response.output.length > 0) {
          console.log(response.output[0]);
          const lines = this.getCmdLines(response.output[0]);
          lines.forEach((line) => {
            let msg: MinikubeStatusMessage;
            msg = JSON.parse(line);
            if (msg.data.message.indexOf('not found.') > -1) {
              v(MinikubeStatus.NotFound);
            }
          });
        }

        v(MinikubeStatus.Unknown);
      });
    });
  }

  getMinikubeTool() {}
}
