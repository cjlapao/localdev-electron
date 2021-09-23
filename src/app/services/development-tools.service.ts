import { Injectable } from '@angular/core';
import { DevelopmentTool } from '../../../app/src/interfaces/development-tool';
import { BaseDevelopmentToolService } from './base-development-tool.service';
import { MinikubeService } from './minikube.service';

@Injectable({
  providedIn: 'root',
})
export class DevelopmentToolsService {
  public tools: DevelopmentTool[];
  public serviceTools: BaseDevelopmentToolService[];

  constructor(
    private minikube: MinikubeService // private kubectl: KubectlService
  ) {
    this.tools = [];
    this.serviceTools = [];
    this.serviceTools.push(minikube);
  }

  async init() {
    this.serviceTools.forEach((t) => {
      this.tools.push(t.tool);
      console.log(t);
      t.init();
    });
  }
}
