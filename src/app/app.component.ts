import {
  DevelopmentTool,
  DevelopmentToolStatus,
} from './../../app/src/interfaces/development-tool';
import { Component } from '@angular/core';
import { MinikubeService } from './services/minikube.service';
import { BaseDevelopmentToolService } from './services/base-development-tool.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'electron-angular-helloworld';
}
