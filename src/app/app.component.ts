import { DevelopmentTool } from './entities/tool';
import { KubectlService } from './services/kubectl.service';
import { Component } from '@angular/core';
import { MinikubeService } from './services/minikube.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'electron-angular-helloworld';
  public status = 'unknown';
  public kubectlVersion = 'unknown';
  public tools: DevelopmentTool[];

  constructor(
    private minikube: MinikubeService,
    private kubectl: KubectlService
  ) {
    this.tools = [];
    this.init();
  }

  async init(): Promise<void> {
    const kubecltTool = await this.kubectl.init();
    const minikubeTool = await this.minikube.init();
    this.tools.push(kubecltTool);
    this.tools.push(minikubeTool);
  }

  async getMinikubeStatus() {
    this.status = 'reading';
    this.status = (await this.minikube.getMinikubeStatus()).toString();
    await this.kubectl.init();
    console.log('testing');
  }
}
