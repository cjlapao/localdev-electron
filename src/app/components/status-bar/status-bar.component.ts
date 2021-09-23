import { DevelopmentToolsService } from './../../services/development-tools.service';
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

  constructor(
    public toolsSvc: DevelopmentToolsService // private kubectl: KubectlService
  ) {}

  async ngOnInit() {
    this.toolsSvc.init();
  }
}
