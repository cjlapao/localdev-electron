import { DevelopmentTool } from './../../../../app/src/interfaces/development-tool';
import { Component, OnInit } from '@angular/core';
import { BaseDevelopmentToolService } from '../../services/base-development-tool.service';
import { MinikubeService } from '../../services/minikube.service';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss'],
})
export class StatusBarComponent implements OnInit {
  public status = 'unknown';
  public kubectlVersion = 'unknown';
  public tools: DevelopmentTool[];
  public serviceTools: BaseDevelopmentToolService[];

  constructor(
    private minikube: MinikubeService // private kubectl: KubectlService
  ) {
    this.tools = [];
    this.serviceTools = [];
    this.serviceTools.push(minikube);
  }

  async ngOnInit() {
    this.serviceTools.forEach((t) => {
      this.tools.push(t.tool);
      console.log(t);
      t.init();
    });
  }

  async test() {
    let t = await this.minikube.status();
    console.log(t);
  }

  async testParameters(): Promise<void> {}

  async getMinikubeStatus() {
    this.status = 'reading';
    this.status = await this.minikube.status();
    // await this.kubectl.init();
    console.log('testing');
  }
}
