// import { DevelopmentTool } from './../../../app/src/interfaces/development-tool';
// import { KubeCtlVersion, KubeCtlVersionResponse } from './../entities/kubectl';
// import { SpawnCommandRequest } from './../../../app/src/interfaces/SpawnCommandRequest';
// import { Injectable } from '@angular/core';
// import { BaseDevelopmentToolService } from './base-development-tool.service';
// import { SpawnCommandResponse } from '../../../app/src/interfaces/SpawnCommandResponse';
// import { catchError, lastValueFrom, map, Observable } from 'rxjs';
// import { HttpParamsOptions, HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root',
// })
// export class KubectlService extends BaseDevelopmentToolService {
//   constructor(private client: HttpClient) {
//     super(client);
//     this.tool = new DevelopmentTool('Minikube');
//   }

//   async init(): Promise<DevelopmentTool> {
//     this.tool.onlineVersion = await this.getLatestOnlineVersionTag();
//     const kubectlVersion = await this.getInstalledToolVersion();
//     this.tool.installedVersion = `${kubectlVersion.major}.${kubectlVersion.minor}`;
//     await this.status();
//     return this.tool;
//   }

//   status(): Promise<DevelopmentToolStatus> {
//     return new Promise((r) => {
//       console.log(`status ${this.tool.installedVersion}`);
//       if (this.tool.installedVersion) {
//         console.log('installed');
//         this.tool.status = DevelopmentToolStatus.Installed;
//       }

//       r(this.tool.status);
//     });
//   }

//   getInstalledToolVersion(): Promise<KubeCtlVersion> {
//     return new Promise((v) => {
//       const cmd: SpawnCommandRequest = {
//         name: 'kubectlVersion',
//         cmd: 'kubectl',
//         args: ['version', '-o', 'json', '--client=true'],
//       };

//       this.ipc.send('spawCmd', cmd);
//       this.ipc.on(`spawCmd_${cmd.name}_Response`, (event, arg) => {
//         const response: SpawnCommandResponse = arg;
//         response.output.forEach((out) => {
//           console.log(out);
//           let msg: KubeCtlVersionResponse;
//           msg = JSON.parse(out);
//           v(msg.clientVersion);
//         });

//         v(null);
//       });
//     });
//   }

//   async downloadLatestVersion(): Promise<void> {
//     let options: object = {
//       responseType: 'blob',
//     };
//   }

//   async getLatestOnlineVersionTag(): Promise<string> {
//     let options: object = {
//       responseType: 'text',
//     };

//     return lastValueFrom(
//       this.httpClient.get<string>(
//         'https://storage.googleapis.com/kubernetes-release/release/stable.txt',
//         options
//       )
//     );
//   }
// }
